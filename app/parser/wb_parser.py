import asyncio
import aiohttp
import json
import re
import time

from app.schemas.product_schema import ProductCreate
from app.crud.product_crud import create_product
from app.db.database import async_session_maker


def clean(text: str) -> float:
    return float(re.sub(r"[^\d]", "", text)) if text else 0.0


REQUESTS_PER_SECOND = 200
DELAY = 1 / REQUESTS_PER_SECOND


async def fetch_and_save(query: str, limit: int = 200):
    base_url = "https://search.wb.ru/exactmatch/ru/common/v4/search"
    params = {
        "appType": 1,
        "curr": "rub",
        "dest": "-1257786",
        "lang": "ru",
        "locale": "ru",
        "query": query,
        "resultset": "catalog",
        "sort": "popular",
        "page": 1
    }

    scraped = 0
    async with aiohttp.ClientSession(connector=aiohttp.TCPConnector(ssl=False)) as http:
        async with async_session_maker() as session:
            while scraped < limit:
                start_time = time.perf_counter()

                async with http.get(base_url, params=params) as resp:
                    text = await resp.text()
                    try:
                        data = json.loads(text)
                    except json.JSONDecodeError:
                        print("Ошибка: не удалось разобрать JSON")
                        break

                    products = data.get("data", {}).get("products", [])
                    if not products:
                        print("Товары закончились или ошибка данных.")
                        break

                    for product in products:
                        if scraped >= limit:
                            break

                        title = product.get("name", "—")
                        price_u = product.get("priceU", 0)
                        sale_price_u = product.get("salePriceU", price_u)
                        rating = product.get("reviewRating", 0)
                        reviews = product.get("feedbacks", 0)

                        print(
                            f"{scraped + 1}. {title} | Цена: {sale_price_u // 100}₽ | Старая: {price_u // 100}₽ | "
                            f"Рейтинг: {rating} | Отзывы: {reviews}")

                        await create_product(
                            db=session,
                            product=ProductCreate(
                                title=title.strip(),
                                price=price_u / 100,
                                discounted_price=sale_price_u / 100,
                                rating=float(rating),
                                reviews=int(reviews),
                            )
                        )

                        scraped += 1

                elapsed = time.perf_counter() - start_time
                if elapsed < DELAY:
                    await asyncio.sleep(DELAY - elapsed)

                params["page"] += 1


async def main():
    await fetch_and_save("наушники", limit=400)


if __name__ == "__main__":
    asyncio.run(main())