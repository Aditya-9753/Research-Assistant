# app/services.py

import time
from sqlalchemy.orm import Session

from app.loaders.news_loader import load_url_text
from app.database.crud import save_history
from app.database.models import QueryLog, Document


def analyze_text(text: str, mode: str) -> str:
    """
    Performs rule-based analysis on extracted text
    """
    sentences = text.split(". ")

    if mode == "summary":
        return "Summary:\n\n" + ". ".join(sentences[:6]) + "."

    if mode == "detailed":
        return "Detailed Analysis:\n\n" + text[:2000]

    if mode == "risks":
        keywords = [
            "risk", "challenge", "problem",
            "issue", "limitation", "concern"
        ]

        risks = [
            s for s in sentences
            if any(k in s.lower() for k in keywords)
        ]

        if risks:
            return "Risk Analysis:\n\n" + ". ".join(risks[:6]) + "."

        return "Risk Analysis:\n\nNo explicit risks found."

    raise ValueError("Invalid mode selected")


def process_research(db: Session, url: str, mode: str) -> dict:
    """
    Core research pipeline:
    - Load URL content
    - Analyze text
    - Store history + analytics
    """
    start_time = time.time()

    # 1️⃣ Load URL content
    text = load_url_text(url)

    if not text or len(text) < 300:
        raise ValueError("Not enough readable content found in the URL")

    # 2️⃣ Analyze content
    result = analyze_text(text, mode)

    response_time = round(time.time() - start_time, 2)

    # 3️⃣ Save research history (existing feature)
    save_history(
        db=db,
        url=str(url),
        mode=mode,
        response=result
    )

    # 4️⃣ Save analytics (NEW – dashboard support)
    db.add(
        QueryLog(
            response_time=response_time,
            source_type="url"
        )
    )

    db.add(
        Document(
            source_type="url",
            source_name=str(url)
        )
    )

    db.commit()

    # 5️⃣ API response
    return {
        "answer": result,
        "sources": [str(url)],
        "response_time": response_time
    }
