# app/loaders/pdf_loader.py

from pathlib import Path
from PyPDF2 import PdfReader


def load_pdf_text(file_path: str) -> str:
    """
    Extracts readable text from a PDF file.

    Responsibility:
    - Validate file
    - Extract text
    - Return clean text

    ❌ No DB
    ❌ No analytics
    ❌ No side-effects
    """
    pdf_path = Path(file_path)

    if not pdf_path.exists():
        raise ValueError("PDF file not found")

    if pdf_path.suffix.lower() != ".pdf":
        raise ValueError("Invalid file type. Only PDF supported")

    reader = PdfReader(pdf_path)
    pages_text = []

    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages_text.append(text)

    full_text = "\n".join(pages_text).strip()

    if len(full_text) < 300:
        raise ValueError("PDF does not contain enough readable text")

    return full_text
