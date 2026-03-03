from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from app.models import User
from app.auth.dependencies import get_db
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    verify_token
)
from app.schemas import UserAuth

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/me")
def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = verify_token(token, "access")
        user_id = payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()

    return {
        "id": user.id,
        "email": user.email,
        "role": user.role
    }


# ==============================
# SIGNUP
# ==============================

@router.post("/signup")
def signup(data: UserAuth, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = User(
        email=data.email,
        password=hash_password(data.password),
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


# ==============================
# LOGIN
# ==============================

@router.post("/login")
def login(data: UserAuth, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access = create_access_token(user.id)
    refresh = create_refresh_token(user.id)

    # For local development use secure=False
    response.set_cookie(
        key="access_token",
        value=access,
        httponly=True,
        secure=False,   # change to True in production (HTTPS)
        samesite="Lax"
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh,
        httponly=True,
        secure=False,   # change to True in production
        samesite="Lax"
    )

    return {"message": "Login successful"}


# ==============================
# REFRESH TOKEN
# ==============================

@router.post("/refresh")
def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")

    if not token:
        raise HTTPException(status_code=401, detail="No refresh token found")

    try:
        payload = verify_token(token, "refresh")
        user_id = payload.get("user_id")

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    new_access = create_access_token(user_id)

    response.set_cookie(
        key="access_token",
        value=new_access,
        httponly=True,
        secure=False,
        samesite="Lax"
    )

    return {"message": "Access token refreshed"}


# ==============================
# LOGOUT
# ==============================

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}