from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Building(Base):
    __tablename__ = "buildings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)
    lat = Column(Float)
    lon = Column(Float)
    
    rooms = relationship("Room", back_populates="building")

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
    """
    Модель таблицы 'steps' — шаги адаптации (0, 1, 2, 3...)
    
    Пример:
    - id: 0
    - title: "Въезд и Миграционная карта"
    - icon: "plane" (название иконки)
    - order: 0 (порядок отображения)
    """
    __tablename__ = "steps"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)  # Название шага
    title_en = Column(String, nullable=True) 
    icon = Column(String)               # Иконка (например, "plane", "home")
    order = Column(Integer)             # Порядок сортировки (0, 1, 2...)
    
    # Связь: один шаг → много статей
    articles = relationship("Article", back_populates="step")


# =============================================================================
# ТАБЛИЦА: articles (Статьи/Подсказки)
# =============================================================================
class Article(Base):
    """
    Модель таблицы 'articles' — статьи с информацией
    
    Пример:
    - id: 1
    - step_id: 0 (ссылка на шаг)
    - title: "Как заполнить миграционную карту"
    - content: "Миграционная карта — это документ..."
    - content_en: "Migration card is a document..." (английская версия)
    """
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    step_id = Column(Integer, ForeignKey("steps.id"))
    title = Column(String, index=True)
    content = Column(Text)        # Текст на русском
    content_en = Column(Text)     # Текст на английском (опционально)
    order = Column(Integer)       # Порядок внутри шага
    
    # Связь: статья → шаг
    step = relationship("Step", back_populates="articles")