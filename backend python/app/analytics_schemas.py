# app/analytics_schemas.py
from pydantic import BaseModel
from typing import List

class DashboardSummaryResponse(BaseModel):
    total_queries: int
    avg_response_time: float
    total_documents: int

    class Config:
        from_attributes = True

class QueriesOverTimeResponse(BaseModel):
    date: str
    queries: int

    class Config:
        from_attributes = True

class SourceBreakdownResponse(BaseModel):
    source: str
    count: int

    class Config:
        from_attributes = True