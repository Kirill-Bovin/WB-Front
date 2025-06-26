# app/db/database.py
import os
from pathlib import Path
from dotenv import load_dotenv

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv(dotenv_path=Path(__file__).parents[2] / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in .env or environment")

Base = declarative_base()

engine = create_async_engine(DATABASE_URL, echo=True)

AsyncSessionLocal = sessionmaker(
                                 bind=engine,
                                 class_=AsyncSession,
                                 expire_on_commit=False,
                                )

async def get_async_session():
    async with AsyncSessionLocal() as session:
        yield session

async_session_maker = AsyncSessionLocal