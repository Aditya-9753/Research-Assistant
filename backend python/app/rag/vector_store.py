# app/rag/vector_store.py
from langchain_community.vectorstores import FAISS
from app.rag.embedding import embeddings

def create_vector_store(texts: list[str]) -> FAISS:
    return FAISS.from_texts(texts, embeddings)

def add_texts_to_vector_store(vector_store: FAISS, texts: list[str]):
    vector_store.add_texts(texts)

def query_vector_store(vector_store: FAISS, query: str, k: int = 5):
    return vector_store.similarity_search(query, k=k)

def save_vector_store(vector_store: FAISS, file_path: str):
    vector_store.save_local(file_path)

def load_vector_store(file_path: str) -> FAISS:
    return FAISS.load_local(
        file_path,
        embeddings,
        allow_dangerous_deserialization=True
    )