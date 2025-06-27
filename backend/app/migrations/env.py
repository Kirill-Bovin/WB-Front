import sys
import os
from logging.config import fileConfig

from sqlalchemy import create_engine, pool
from alembic import context
from dotenv import load_dotenv

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
# Загружаем переменные окружения из .env
load_dotenv()

# Alembic config
config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Импортируем metadata
from app.db.models import Base  # путь подгони под свой
target_metadata = Base.metadata

def run_migrations_offline():
    url = os.getenv("SYNC_DATABASE_URL")
    if not url:
        raise RuntimeError("SYNC_DATABASE_URL not set")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    url = os.getenv("SYNC_DATABASE_URL")
    if not url:
        raise RuntimeError("SYNC_DATABASE_URL not set")

    connectable = create_engine(url, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()