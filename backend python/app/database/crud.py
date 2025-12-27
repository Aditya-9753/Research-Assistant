# app/database/crud.py
from sqlalchemy.orm import Session
from app.database import models


def save_history(db: Session, url: str, mode: str, response: str):
    record = models.ResearchHistory(
        url=url,
        mode=mode,
        response=response
    )
    db.add(record)
    db.commit()           # 🔥 VERY IMPORTANT
    db.refresh(record)
    return record


def get_history(db: Session, limit: int = 10):
    return (
        db.query(models.ResearchHistory)
        .order_by(models.ResearchHistory.created_at.desc())
        .limit(limit)
        .all()
    )
