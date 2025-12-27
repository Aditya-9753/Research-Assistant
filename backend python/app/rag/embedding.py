# app/rag/embedding.py
from langchain_openai import OpenAIEmbeddings
from app.config import settings

embeddings = OpenAIEmbeddings(
    api_key=settings.OPENAI_API_KEY
)

def get_embedding(text: str):
    return embeddings.embed_query(text)

def get_batch_embeddings(texts: list[str]):
    return embeddings.embed_documents(texts)