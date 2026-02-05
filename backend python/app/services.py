# app/services.py
import time
import logging
from sqlalchemy.orm import Session

from app.loaders.url_loader import load_url_text
from app.database.crud import save_history
from app.database.models import QueryLog, Document
from app.rag.chunking import chunk_text
from app.rag.vector_store import create_vector_store
from app.rag.rag_pipeline import run_rag

logger = logging.getLogger(__name__)

def process_research(db: Session, url: str, mode: str) -> dict:
    start_time = time.time()

    # 1. Content Extraction
    text = load_url_text(str(url))
    if not text or len(text) < 300:
        raise ValueError("Deep Scan failed: Not enough readable content found.")

    # 2. Chunking (Poora text process hoga)
    chunks = chunk_text(text, chunk_size=600, overlap=100)
    
    # 3. Create Vector Store (Now using Free Embeddings)
    vector_store = create_vector_store(chunks)

    # 4. AI Analysis with Quota Check
    query_map = {
        "summary": "Summarize the key business points of this content.",
        "detailed": "Provide a deep dive into strategy, operations, and market outlook.",
        "risks": "Identify all potential financial and operational risks."
    }

    try:
        if vector_store:
            # RAG Pipeline (OpenAI chat call)
            result = run_rag(vector_store, mode, query_map[mode])
        else:
            result = get_local_fallback(text, mode)
    except Exception as e:
        logger.error(f"AI Call failed (Likely Quota): {e}")
        result = get_local_fallback(text, mode)

    response_time = round(time.time() - start_time, 2)

    # 5. Database Save
    save_history(db=db, url=str(url), mode=mode, response=result)
    db.add(QueryLog(response_time=response_time, source_type="url"))
    db.add(Document(source_type="url", source_name=str(url)))
    db.commit()

    return {
        "answer": result,
        "sources": [str(url)],
        "response_time": response_time
    }

def get_local_fallback(text: str, mode: str) -> str:
    """Agar OpenAI Quota khatam hai toh ye results dikhayega"""
    sentences = text.split(". ")
    header = "⚠️ [LOCAL ANALYSIS - OPENAI QUOTA EXCEEDED]\n\n"
    if mode == "risks":
        keywords = ["risk", "challenge", "threat", "issue"]
        found = [s for s in sentences if any(k in s.lower() for k in keywords)]
        return header + (". ".join(found[:5]) if found else "No explicit risks found in text.")
    
    return header + f"Extracted Content:\n\n{text[:1200]}..."