from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class ResumeUsage(Base):
    __tablename__ = "resume_usage"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    used_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")