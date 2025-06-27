# WB+Front — Wildberries Product Parser & Dashboard

Проект для парсинга товаров с Wildberries, хранения данных в PostgreSQL, отображения фильтруемых таблиц и графиков через веб-интерфейс.

## Технологии

* **Backend:** FastAPI + SQLAlchemy (async) + Alembic + PostgreSQL
* **Парсинг:** Playwright + BeautifulSoup
* **Фоновая обработка:** Celery + RabbitMQ + Redis
* **Frontend:** React + Vite + Tailwind CSS + Recharts
* **DevOps:** Docker, Docker Compose, Poetry

## Запуск проекта

```bash
 git clone https://github.com/Kirill-Bovin/WB-Front.git
 cd WB-Front
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
*  Фоновый парсинг по расписанию (Celery)

##  Миграции вручную

```bash
 docker compose exec backend poetry run alembic revision --autogenerate -m "create products table"
 docker compose exec backend poetry run alembic upgrade head
```


