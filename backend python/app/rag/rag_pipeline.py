from langchain_openai import ChatOpenAI
from app.prompts.equity_prompts import get_prompt
from app.config import settings
import time
import random


def run_rag(vector_store, mode: str, query: str) -> str:
    """
    SAFE RAG EXECUTION
    - No OpenAI error escapes this function
    - Always returns a STRING
    - 429 / quota / billing never crash backend
    """

    # 1️⃣ Retrieve chunks
    docs = vector_store.similarity_search(query, k=4)
    context = "\n\n".join(doc.page_content for doc in docs) if docs else ""

    if not context.strip():
        return fallback_response(mode, "")

    prompt = get_prompt(mode, context)

    # 2️⃣ Retry logic (soft retry, not aggressive)
    max_retries = 2

    for attempt in range(max_retries):
        try:
            llm = ChatOpenAI(
                api_key=settings.OPENAI_API_KEY,
                temperature=0.2
            )

            response = llm.invoke(prompt)
            return response.content  # ✅ STRING ONLY

        except Exception as e:
            print(f"[LLM ERROR attempt {attempt + 1}] → {e}")

            # Quota exhausted → retry useless → fallback immediately
            if "quota" in str(e).lower() or "429" in str(e):
                break

            # Small backoff for transient errors
            time.sleep(1 + random.random())

    # 3️⃣ FINAL fallback (GUARANTEED)
    print("LLM unavailable → Using fallback response")
    return fallback_response(mode, context)


# -------------------------
# Fallback logic (NO API CALL)
# -------------------------

def fallback_response(mode: str, context: str) -> str:
    short_context = context[:800] if context else "Public information extracted."

    if mode == "summary":
        return (
            "Summary (Fallback Mode):\n\n"
            "This organization operates in its industry with an established business model "
            "and market presence. The following summary is generated from publicly available "
            "textual information.\n\n"
            f"Context Extract:\n{short_context}"
        )

    if mode == "detailed":
        return (
            "Detailed Analysis (Fallback Mode):\n\n"
            "The company demonstrates structured operations, diversified services, and "
            "strategic positioning. Performance depends on execution, market conditions, "
            "and long-term planning.\n\n"
            f"Context Extract:\n{short_context}"
        )

    if mode == "risks":
        return (
            "Risk Analysis (Fallback Mode):\n\n"
            "Potential risks include competitive pressure, regulatory changes, economic "
            "volatility, and reliance on external market factors.\n\n"
            f"Context Extract:\n{short_context}"
        )

    return "Analysis unavailable."
