import os
import subprocess

def main():
    # Установка зависимостей фронта (если нет node_modules)
    if not os.path.exists("frontend/node_modules"):
        subprocess.run(["npm", "install"], cwd="frontend", check=True)

    # Применение миграций Alembic
    subprocess.run(["alembic", "upgrade", "head"], check=True)

    # Запуск фронта (в фоне)
    subprocess.Popen(["npm", "run", "dev"], cwd="frontend")

    # Запуск бэкенда
    subprocess.run(["uvicorn", "app.main:app", "--reload", "--port", "8000"])