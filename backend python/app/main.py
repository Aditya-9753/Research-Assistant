# app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import traceback

from app.database.sqlite import SessionLocal, engine
from app.database import models
from app.database.crud import get_history
from app.schemas import ResearchRequest, ResearchResponse, HistoryRecord
from app.services import process_research

# -------------------------
# App Initialization
# -------------------------

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Equity Research Assistant",
    description="Equity research API using real URL content analysis",
    version="1.1.0"
)

# -------------------------
# CORS (Frontend access)
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Dependencies
# -------------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------
# Health
# -------------------------

@app.get("/", tags=["Health"])
def root():
    return {
        "status": "running",
        "service": "AI Equity Research Assistant",
        "docs": "/docs",
    }

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}

# -------------------------
# API v1 – Research
# -------------------------

@app.post(
    "/api/v1/research",
    response_model=ResearchResponse,
    tags=["Research"],
    status_code=status.HTTP_200_OK,
)
def research_endpoint(
    req: ResearchRequest,
    db: Session = Depends(get_db),
):
    try:
        # 🔥 Core business logic
        return process_research(db, req.url, req.mode)

    except ValueError as e:
        # URL / content / validation related errors
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    except Exception as e:
        # 🔥 FULL TRACEBACK FOR DEBUGGING
        print("\n========== INTERNAL SERVER ERROR ==========")
        traceback.print_exc()
        print("=========================================\n")

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

# -------------------------
# API v1 – History
# -------------------------

@app.get(
    "/api/v1/history",
    response_model=List[HistoryRecord],
    tags=["History"],
)
def history_endpoint(
    limit: int = 10,
    db: Session = Depends(get_db),
):
    if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Limit must be between 1 and 100",
        )

    return get_history(db, limit)
