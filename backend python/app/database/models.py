# app/database/models.py
from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean
from sqlalchemy.sql import func
from app.database.sqlite import Base


class ResearchHistory(Base):
    __tablename__ = "research_history"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, nullable=False, index=True)
    mode = Column(String, nullable=False)
    response = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# ---------------------------
# NEW: Query analytics table
# ---------------------------
class QueryLog(Base):
    __tablename__ = "query_logs"

    id = Column(Integer, primary_key=True, index=True)
    response_time = Column(Float, nullable=False)
    source_type = Column(String, nullable=False)   # pdf / url
    created_at = Column(DateTime(timezone=True), server_default=func.now())


# ---------------------------
# NEW: Document analytics
# ---------------------------
class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    source_type = Column(String, nullable=False)   # pdf / url
    source_name = Column(String, nullable=False)   # filename / url
    created_at = Column(DateTime(timezone=True), server_default=func.now())
