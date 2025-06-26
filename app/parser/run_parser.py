# app/parser/run_parser.py

import asyncio
from pathlib import Path

from dotenv import load_dotenv
from app.db.database import AsyncSessionLocal
from app.parser.wb_parser import parse_wb_via_browser

# Подгружаем .env из корня
load_dotenv(dotenv_path=Path(__file__).parents[2] / ".env")

async def main():
    query = "телефон"
    async with AsyncSessionLocal() as session:
        products = await parse_wb_via_browser(query, session)
        print(f"Найдено/сохранено {len(products)} товаров по запросу «{query}»:")
        for p in products:
            print(f" • {p.title[:50]:50} | {p.price:7.2f} ₽ → {p.discounted_price:7.2f} ₽ | "
                  f"рейтинг {p.rating:.1f} | {p.reviews} отзывов")

if __name__ == "__main__":
    asyncio.run(main())