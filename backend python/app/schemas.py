# app/schemas.py
from pydantic import BaseModel, HttpUrl, field_validator
from datetime import datetime
from typing import List, Literal


# -------------------------
# Request Schema
# -------------------------

class ResearchRequest(BaseModel):
    url: HttpUrl
    mode: Literal["summary", "detailed", "risks"]

    @field_validator("mode")
    @classmethod
    def validate_mode(cls, value: str) -> str:
        if value not in {"summary", "detailed", "risks"}:
            raise ValueError("mode must be summary, detailed, or risks")
        return value


# -------------------------
# Response Schema
# -------------------------

class ResearchResponse(BaseModel):
    answer: str
    sources: List[str]   # 🔥 string hi rakho (DB + API safe)


# -------------------------
# History Schema
# -------------------------

class HistoryRecord(BaseModel):
    id: int
    url: str
    mode: str
    response: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }
