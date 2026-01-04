from pydantic import BaseModel


class DashboardSummaryResponse(BaseModel):
    total_queries: int
    avg_response_time: float
    total_documents: int


class QueriesOverTimeResponse(BaseModel):
    date: str
    queries: int


class SourceBreakdownResponse(BaseModel):
    source: str   # pdf / url
    count: int