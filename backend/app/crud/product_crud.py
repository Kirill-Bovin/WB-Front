from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List

from app.db.models import Product
from app.schemas.product_schema import ProductCreate


async def create_product(db: AsyncSession, product: ProductCreate):
    db_product = Product(**product.dict())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product


async def get_products(
    db: AsyncSession,
    min_price: Optional[float] = None,
    min_rating: Optional[float] = None,
    min_reviews: Optional[int] = None
) -> List[Product]:
    stmt = select(Product)

    if min_price is not None:
        stmt = stmt.where(Product.price >= min_price)
    if min_rating is not None:
        stmt = stmt.where(Product.rating >= min_rating)
    if min_reviews is not None:
        stmt = stmt.where(Product.reviews >= min_reviews)

    result = await db.execute(stmt)
    return result.scalars().all()