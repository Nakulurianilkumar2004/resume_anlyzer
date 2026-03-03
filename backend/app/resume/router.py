from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user, require_admin
from app.database import get_db
from app.models import User
from app.resume.models import ResumeUsage
from app.resume.utils import extract_text_from_pdf, extract_text_from_docx
from app.resume.service import analyze_resume

router = APIRouter(prefix="/resume", tags=["Resume"])


@router.post("/analyze")
async def analyze_user_resume(
    resume: UploadFile = File(...),
    jd: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    file_bytes = await resume.read()

    if resume.filename.endswith(".pdf"):
        resume_text = extract_text_from_pdf(file_bytes)
    elif resume.filename.endswith(".docx"):
        resume_text = extract_text_from_docx(file_bytes)
    else:
        return {"error": "Unsupported file format"}

    ai_result = analyze_resume(resume_text, jd)

    # Only track usage (NOT resume content)
    usage = ResumeUsage(user_id=current_user.id)
    db.add(usage)
    db.commit()

    return {"analysis": ai_result}


# 👑 ADMIN: Only show emails of users who used analyzer
@router.get("/admin/active-users")
def get_active_users(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    users = (
        db.query(User.email)
        .join(ResumeUsage, ResumeUsage.user_id == User.id)
        .distinct()
        .all()
    )

    return {"users": [u[0] for u in users]}