from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    sync_database_url: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
DATABASE_URL = settings.DATABASE_URL