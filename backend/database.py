import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Загружаем переменные из файла .env
load_dotenv()

# Получаем DATABASE_URL (для Render)
database_url = os.getenv("DATABASE_URL")

# Если нет DATABASE_URL — используем отдельные переменные (для локальной разработки)
if not database_url:
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME", "navigator")
    DB_HOST = os.getenv("DB_HOST", "localhost")
    
    # Собираем строку подключения
    database_url = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"

# Используем ОДНУ переменную database_url
engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()