# app/config.py

from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env before reading settings
load_dotenv()


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    DATABASE_URL: str = "sqlite:///./data/equity.db"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
