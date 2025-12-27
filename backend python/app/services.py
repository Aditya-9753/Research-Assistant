from sqlalchemy.orm import Session
from app.loaders.news_loader import load_url_text
from app.database.crud import save_history


def analyze_text(text: str, mode: str) -> str:
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
    # 1️⃣ Load content
    text = load_url_text(url)

    if not text or len(text) < 300:
        raise ValueError("Not enough readable content found in the URL")

    # 2️⃣ Analyze
    result = analyze_text(text, mode)

    # 3️⃣ Save to DB (🔥 FIXED)
    save_history(
        db=db,
        url=str(url),
        mode=mode,
        response=result
    )

    # 4️⃣ Return API response
    return {
        "answer": result,
        "sources": [str(url)]
    }
