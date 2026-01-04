# app/main.py

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import traceback
import logging

from app.database.sqlite import engine, get_db   # ✅ IMPORT get_db
from app.database import models
from app.database.crud import get_history
from app.schemas import ResearchRequest, ResearchResponse, HistoryRecord
from app.services import process_research

# Analytics router
from app.analytics.routes import router as analytics_router

# -------------------------------------------------
# Logging Setup
# -------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)

# -------------------------------------------------
# Database Init
# -------------------------------------------------

models.Base.metadata.create_all(bind=engine)

# -------------------------------------------------
# App Initialization
# -------------------------------------------------

app = FastAPI(
    title="AI Equity Research Assistant",
    description="Equity research API using real URL content analysis",
    version="1.2.0",
)

# -------------------------------------------------
# CORS
# -------------------------------------------------

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

# -------------------------------------------------
# Startup / Shutdown
# -------------------------------------------------

@app.on_event("startup")
def on_startup():
    logger.info("🚀 Application startup completed")


@app.on_event("shutdown")
def on_shutdown():
    logger.info("🛑 Application shutdown completed")

# -------------------------------------------------
# Health
# -------------------------------------------------

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

# -------------------------------------------------
# API v1 – Research
# -------------------------------------------------

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
        logger.info(f"📥 Research request received | mode={req.mode}")
        return process_research(db, req.url, req.mode)

    except ValueError as exc:
        logger.warning(f"⚠️ Validation error: {exc}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )

    except Exception:
        logger.error("🔥 Internal server error during research")
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )

# -------------------------------------------------
# API v1 – History
# -------------------------------------------------

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

# -------------------------------------------------
# API v1 – Analytics
# -------------------------------------------------

app.include_router(
    analytics_router,
    prefix="/api/v1",
)
