from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from database import engine, Base, SessionLocal
from models import Building, Room, Step, Article

app = FastAPI(title="Navigator API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаём таблицы ПРИ ПЕРВОМ ЗАПРОСЕ (не при импорте!)
tables_created = False

def create_tables_if_needed():
    global tables_created
    if not tables_created:
        Base.metadata.create_all(bind=engine)
        tables_created = True

# Зависимость БД
def get_db():
    create_tables_if_needed()  # Создаём таблицы перед первым запросом
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Health check
@app.get("/health")
def health_check():
    create_tables_if_needed()
    return {"status": "ok"}

# Получить все корпуса
@app.get("/api/buildings")
def get_buildings(db: Session = Depends(get_db)):
    return db.query(Building).all()

# Добавить корпус
@app.post("/api/buildings")
def create_building(name: str, address: str, lat: float, lon: float, db: Session = Depends(get_db)):
    db_building = Building(name=name, address=address, lat=lat, lon=lon)
    db.add(db_building)
    db.commit()
    db.refresh(db_building)
    return db_building

# Получить все шаги
@app.get("/api/steps")
def get_steps(db: Session = Depends(get_db)):
    return db.query(Step).order_by(Step.order).all()

# Получить статьи шага
@app.get("/api/steps/{step_id}/articles")
def get_step_articles(step_id: int, db: Session = Depends(get_db)):
    return db.query(Article).filter(Article.step_id == step_id).order_by(Article.order).all()

# Добавить шаг
@app.post("/api/steps")
def create_step(id: int, title: str, icon: str, title_en: str = None, order: int = 0, db: Session = Depends(get_db)):
    existing = db.query(Step).filter(Step.id == id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Step with this ID already exists")
    
    db_step = Step(id=id, title=title, title_en=title_en, icon=icon, order=order)
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step
