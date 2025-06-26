from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.products import router

app = FastAPI()

# ✅ Настройка CORS для разрешения запросов с фронта
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # или ["*"] временно
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Тестовые ручки (опционально)
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

# Подключение роутера с /api/products/
app.include_router(router)
