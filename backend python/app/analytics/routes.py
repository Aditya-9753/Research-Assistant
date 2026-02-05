from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

# Relative imports use kar rahe hain taaki path conflict na ho
from ..database.sqlite import get_db
from .service import (
    get_dashboard_summary,
    get_queries_over_time,
    get_source_breakdown
)
from ..analytics_schemas import (
    DashboardSummaryResponse,
    QueriesOverTimeResponse,
    SourceBreakdownResponse
)

# Prefix ko thoda clean rakhte hain
router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/summary", response_model=DashboardSummaryResponse)
def fetch_dashboard_summary(db: Session = Depends(get_db)):
    """
    Returns total queries, avg response time, and total documents
    """
    return get_dashboard_summary(db)

@router.get("/queries-over-time", response_model=list[QueriesOverTimeResponse])
def fetch_queries_over_time(db: Session = Depends(get_db)):
    """
    Returns query counts grouped by date
    """
    return get_queries_over_time(db)

@router.get("/source-breakdown", response_model=list[SourceBreakdownResponse])
def fetch_source_breakdown(db: Session = Depends(get_db)):
    """
    Returns breakdown of data sources (PDF vs URL)
    """
    return get_source_breakdown(db)