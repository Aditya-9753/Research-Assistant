import requests
from bs4 import BeautifulSoup


def load_url_text(url: str) -> str:
    response = requests.get(
        url,
        timeout=10,
        headers={"User-Agent": "Mozilla/5.0"}
    )

    soup = BeautifulSoup(response.text, "html.parser")

    paragraphs = [
        p.get_text(strip=True)
        for p in soup.find_all("p")
    ]

    return " ".join(paragraphs)
