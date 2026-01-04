# app/database/analytics_crud.py
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.models import QueryLog, Document


def fetch_summary_stats(db: Session):
    total_queries = db.query(QueryLog).count()

    avg_response_time = (
        db.query(func.avg(QueryLog.response_time)).scalar() or 0
    )

    total_documents = db.query(Document).count()

    return {
        "total_queries": total_queries,
        "avg_response_time": round(avg_response_time, 2),
        "total_documents": total_documents,
    }


def fetch_queries_grouped_by_date(db: Session):
    rows = (
        db.query(
            func.date(QueryLog.created_at).label("date"),
            func.count(QueryLog.id).label("queries")
        )
        .group_by(func.date(QueryLog.created_at))
        .all()
    )

    return [{"date": str(r.date), "queries": r.queries} for r in rows]


def fetch_source_stats(db: Session):
    rows = (
        db.query(
            Document.source_type,
            func.count(Document.id).label("count")
        )
        .group_by(Document.source_type)
        .all()
    )

    return [{"source": r.source_type, "count": r.count} for r in rows]
