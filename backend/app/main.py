from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.auth.router import router as auth_router
from app.resume.router import router as resume_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Resume Analyzer SaaS")

# ✅ ADD THIS CORS SECTION
origins = [
    "http://localhost:5173",  # Vite frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(resume_router)