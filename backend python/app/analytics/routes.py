from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.sqlite import get_db
from app.analytics.service import (
    get_dashboard_summary,
    get_queries_over_time,
    get_source_breakdown
)
from app.analytics_schemas import (
    DashboardSummaryResponse,
    QueriesOverTimeResponse,
    SourceBreakdownResponse
)

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/summary", response_model=DashboardSummaryResponse)
def fetch_dashboard_summary(db: Session = Depends(get_db)):
    """
    High-level analytics for dashboard cards
    """
    return get_dashboard_summary(db)


@router.get("/queries-over-time", response_model=list[QueriesOverTimeResponse])
def fetch_queries_over_time(db: Session = Depends(get_db)):
    """
    Returns date-wise query count
    """
    return get_queries_over_time(db)


@router.get("/source-breakdown", response_model=list[SourceBreakdownResponse])
def fetch_source_breakdown(db: Session = Depends(get_db)):
    """
    Returns PDF vs URL usage
    """
    return get_source_breakdown(db)
