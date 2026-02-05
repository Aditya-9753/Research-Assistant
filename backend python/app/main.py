# app/main.py
import os
import logging
import traceback
from typing import List

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

# Database and Services
from app.database.sqlite import engine, get_db
from app.database import models
from app.database.crud import get_history
from app.schemas import ResearchRequest, ResearchResponse, HistoryRecord
from app.services import process_research

# Analytics
from app.analytics.routes import router as analytics_router

# -------------------------------------------------
# 1. Directory Setup (Safety check)
# -------------------------------------------------
# SQLite ke liye 'data' folder agar nahi hai toh bana do
if not os.path.exists("./data"):
    os.makedirs("./data")

# -------------------------------------------------
# 2. Database Init
# -------------------------------------------------
# Tables create karna (startup se pehle ensure karna)
models.Base.metadata.create_all(bind=engine)

# -------------------------------------------------
# 3. Logging Config
# -------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
)
logger = logging.getLogger(__name__)

# -------------------------------------------------
# 4. App Initialization
# -------------------------------------------------
app = FastAPI(
    title="AI Equity Research Assistant",
    description="Advanced RAG-based Research Assistant",
    version="1.2.0",
)

# -------------------------------------------------
# 5. CORS (Allow Frontend)
# -------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Vikas phase mein '*' use kar sakte hain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------
# 6. Health & Root Endpoints
# -------------------------------------------------
@app.get("/", tags=["Health"])
def root():
    return {"status": "online", "message": "Research API is active"}

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}

# -------------------------------------------------
# 7. Research Endpoint (Deep Scan Logic)
# -------------------------------------------------
@app.post(
    "/api/v1/research",
    response_model=ResearchResponse,
    tags=["Research"]
)
def research_endpoint(req: ResearchRequest, db: Session = Depends(get_db)):
    try:
        logger.info(f"📥 Deep Scan Request: {req.url} | Mode: {req.mode}")
        # process_research ab RAG use karega (updated services.py ke saath)
        return process_research(db, req.url, req.mode)

    except ValueError as exc:
        logger.warning(f"⚠️ Validation error: {exc}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        )
    except Exception as e:
        logger.error(f"🔥 Deep Scan Failed: {str(e)}")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail="Research failed. AI model or Scraper issue."
        )

# -------------------------------------------------
# 8. History & Analytics Routers
# -------------------------------------------------
@app.get("/api/v1/history", response_model=List[HistoryRecord], tags=["History"])
def history_endpoint(limit: int = 10, db: Session = Depends(get_db)):
    return get_history(db, limit)

# Analytics Router include karna
app.include_router(analytics_router, prefix="/api/v1") 