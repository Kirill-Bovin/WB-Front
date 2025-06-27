#!/bin/sh

echo "⏳ Ждём PostgreSQL..."
/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "✅ DB доступна!"

echo "📦 Применяем миграции Alembic..."
poetry run alembic upgrade head

echo "🚀 Запускаем FastAPI..."
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000