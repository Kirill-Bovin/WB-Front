from pydantic import BaseModel
from typing import Optional


class ProductBase(BaseModel):
    title: str
    price: Optional[float] = None
    discounted_price: Optional[float] = None
    rating: Optional[float] = None
    reviews: Optional[int] = None


class ProductCreate(ProductBase):
    pass


class ProductOut(ProductBase):
    id: int

    class Config:
        orm_mode = True