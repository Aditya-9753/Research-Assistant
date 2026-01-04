# app/loaders/url_loader.py

import requests
from bs4 import BeautifulSoup


def load_url_text(url: str) -> str:
    """
    Fetches and cleans readable text content from a single URL.

    Responsibilities:
    - Fetch HTML
    - Remove non-content tags
    - Return clean plain text

    ❌ No DB operations
    ❌ No analytics
    ❌ No business logic
    """
    try:
        response = requests.get(
            url,
            timeout=10,
            headers={
                "User-Agent": "Mozilla/5.0"
            }
        )
        response.raise_for_status()

    except requests.RequestException as exc:
        raise ValueError(f"Failed to fetch URL content: {exc}")

    soup = BeautifulSoup(response.text, "html.parser")

    # Remove non-content elements
    for tag in soup([
        "script",
        "style",
        "nav",
        "footer",
        "header",
        "aside",
        "noscript"
    ]):
        tag.decompose()

    text = soup.get_text(separator=" ")
    clean_text = " ".join(text.split()).strip()

    if len(clean_text) < 300:
        raise ValueError("Not enough readable content found in the URL")

    return clean_text
