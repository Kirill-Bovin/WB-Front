from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.db.session import get_async_session
from app.schemas.product_schema import ProductCreate, ProductOut
from app.crud.product_crud import get_products, create_product
from app.crud.fetch_and_save import fetch_and_save
from fastapi import BackgroundTasks

router = APIRouter(prefix="/api/products", tags=["Products"])


@router.get("/", response_model=List[ProductOut])
async def list_products(
    min_price: Optional[float] = Query(None, ge=0),
    min_rating: Optional[float] = Query(None, ge=0, le=5),
    min_reviews: Optional[int] = Query(None, ge=0),
    session: AsyncSession = Depends(get_async_session)
):
    return await get_products(
        db=session,
        min_price=min_price,
        min_rating=min_rating,
        min_reviews=min_reviews
    )


@router.post("/", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
async def add_product(
    product_in: ProductCreate,
    session: AsyncSession = Depends(get_async_session)
):

    db_obj = await create_product(db=session, product=product_in)
    return db_obj

@router.post("/fetch")
async def fetch_products(
    background_tasks: BackgroundTasks,
    query: str = Query(..., description="Поисковый запрос"),
    limit: int = Query(100, ge=1, le=1000, description="Максимум товаров")
):
    background_tasks.add_task(fetch_and_save, query, limit)
    return {"message": f"Запущен парсинг по запросу '{query}' на {limit} товаров"}