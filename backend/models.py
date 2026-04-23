from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# =============================================================================
# ТАБЛИЦА: buildings (Корпуса)
# =============================================================================
class Building(Base):
    __tablename__ = "buildings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    description = Column(Text)
    lat = Column(Float)
    lon = Column(Float)
    is_active = Column(Boolean, default=True)
    
    rooms = relationship("Room", back_populates="building")

# =============================================================================
# ТАБЛИЦА: rooms (Аудитории)
# =============================================================================
class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    building_id = Column(Integer, ForeignKey("buildings.id"))
    floor = Column(Integer)
    capacity = Column(Integer)
    
    building = relationship("Building", back_populates="rooms")

# =============================================================================
# ТАБЛИЦА: steps (Шаги адаптации)
# =============================================================================
class Step(Base):
    __tablename__ = "steps"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    title_en = Column(String, nullable=True) 
    icon = Column(String)
    order = Column(Integer)
    
    articles = relationship("Article", back_populates="step")

# =============================================================================
# ТАБЛИЦА: articles (Статьи/Подсказки)
# =============================================================================
class Article(Base):
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    step_id = Column(Integer, ForeignKey("steps.id"))
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    content_en = Column(Text)
    order = Column(Integer, default=0)
    
    step = relationship("Step", back_populates="articles")

# =============================================================================
# ТАБЛИЦА: users (Пользователи)
# =============================================================================
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    country = Column(String)
    preferred_language = Column(String, default="ru")
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
