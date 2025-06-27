# WB+Front — Wildberries Product Parser & Dashboard

Проект для парсинга товаров с Wildberries, хранения данных в PostgreSQL, отображения фильтруемых таблиц и графиков через веб-интерфейс.

## Технологии

* **Backend:** FastAPI + SQLAlchemy (async) + Alembic + PostgreSQL
* **Парсинг:** Playwright + BeautifulSoup
* **Фоновая обработка:** Celery + RabbitMQ + Redis
* **Frontend:** React + Vite + Tailwind CSS + Recharts
* **DevOps:** Docker, Docker Compose, Poetry

## Запуск проекта
Скопируйте проект
```
 git clone https://github.com/Kirill-Bovin/WB-Front.git
```

 Создайте 2 файла .env один в корне WB-Front, другой в WB-Front/backend
```
в корне проекта WB-Front
touch .env

cd backend
touch .env
```

В оба файла вставьте сл. текст в .env:
```
DATABASE_URL=postgresql+asyncpg://admindb:db123@db:5432/wbdb
SYNC_DATABASE_URL=postgresql+psycopg2://admindb:db123@db:5432/wbdb
```
Возвращаемся в корень проекта
```
 cd ..
```
И запускаем докер
```
 docker compose up --build
```




* Backend: [http://localhost:8000](http://localhost:8000)
* Frontend: [http://localhost](http://localhost)

## Особенности

*  Автоматическое применение миграций при запуске backend-контейнера (`alembic upgrade head`)
*  Проксирование /api → FastAPI через Vite и nginx
*  /api/products/ возвращает список товаров в JSON

## Возможности

*  Парсинг Wildberries по ключевым словам
*  Графики: цены, скидки, отзывы
*  Фильтрация по цене, рейтингу, кол-ву отзывов
*  Расширяемость(Фоновый парсинг по расписанию (Celery))

##  Миграции вручную(Если вдруг не сработали автоматически)

```bash
 docker compose exec backend poetry run alembic revision --autogenerate -m "create products table"
 docker compose exec backend poetry run alembic upgrade head
```


