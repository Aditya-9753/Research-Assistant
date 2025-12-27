from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# 🔥 Force load .env
load_dotenv()

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    DATABASE_URL: str = "sqlite:///./data/equity.db"

    class Config:
        extra = "ignore"

settings = Settings()

# 🔍 DEBUG (temporary)
print("CONFIG LOADED KEY:", settings.OPENAI_API_KEY[:10])
