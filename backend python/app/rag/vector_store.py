# app/rag/vector_store.py
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

# Ye model free hai aur aapke CPU par chalega (OpenAI quota nahi lagega)
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def create_vector_store(texts: list[str]) -> FAISS:
    try:
        if not texts:
            return None
        # OpenAI ki jagah local model use ho raha hai
        return FAISS.from_texts(texts, embeddings)
    except Exception as e:
        print(f"Vector Store Error: {e}")
        return None

def query_vector_store(vector_store: FAISS, query: str, k: int = 5):
    if not vector_store:
        return []
    return vector_store.similarity_search(query, k=k)

def save_vector_store(vector_store: FAISS, file_path: str):
    vector_store.save_local(file_path)

def load_vector_store(file_path: str) -> FAISS:
    return FAISS.load_local(
        file_path, 
        embeddings, 
        allow_dangerous_deserialization=True
    )