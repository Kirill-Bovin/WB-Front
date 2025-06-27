from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.products import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",           # добавлено!
        "http://localhost:3000",
        "http://127.0.0.1",           # добавлено!
        "http://127.0.0.1:3000",
        "http://frontend:80"
    ],
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
