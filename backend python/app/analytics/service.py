# app/analytics/service.py

from sqlalchemy.orm import Session
from app.database.analytics_crud import (
    fetch_summary_stats,
    fetch_queries_grouped_by_date,
    fetch_source_stats
)


def get_dashboard_summary(db: Session):
    """
    Returns top-level dashboard metrics
    """
    stats = fetch_summary_stats(db)

    # Empty state handling (professional touch)
    if stats["total_queries"] == 0:
        return {
            "total_queries": 0,
            "avg_response_time": 0.0,
            "total_documents": 0
        }

    return stats


def get_queries_over_time(db: Session):
    """
    Returns date-wise query count
    """
    return fetch_queries_grouped_by_date(db)


def get_source_breakdown(db: Session):
    """
    Returns PDF vs URL usage
    """
    return fetch_source_stats(db)
