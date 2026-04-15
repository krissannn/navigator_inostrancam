from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from database import engine, Base, SessionLocal
from models import Building, Room, Step, Article

# Создаём таблицы
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Navigator API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic схемы ПРЯМО ЗДЕСЬ (проще так)
class BuildingBase(BaseModel):
    name: str
    address: str
    lat: float
    lon: float

class BuildingCreate(BuildingBase):
    pass

class BuildingResponse(BuildingBase):
    id: int
    
    class Config:
        orm_mode = True

class StepBase(BaseModel):
    title: str
    icon: str
    order: int = 0

class StepCreate(StepBase):
    id: int
    title_en: Optional[str] = None

class StepResponse(StepBase):
    id: int
    title_en: Optional[str] = None
    
    class Config:
        orm_mode = True

# Зависимость БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Health check
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Получить все корпуса
@app.get("/api/buildings", response_model=List[BuildingResponse])
def get_buildings(db: Session = Depends(get_db)):
    return db.query(Building).all()

# Добавить корпус
@app.post("/api/buildings", response_model=BuildingResponse)
def create_building(building: BuildingCreate, db: Session = Depends(get_db)):
    db_building = Building(**building.dict())
    db.add(db_building)
    db.commit()
    db.refresh(db_building)
    return db_building

# Получить все шаги
@app.get("/api/steps", response_model=List[StepResponse])
def get_steps(db: Session = Depends(get_db)):
    return db.query(Step).order_by(Step.order).all()

# Получить статьи шага
@app.get("/api/steps/{step_id}/articles")
def get_step_articles(step_id: int, db: Session = Depends(get_db)):
    return db.query(Article).filter(Article.step_id == step_id).order_by(Article.order).all()

# Добавить шаг
@app.post("/api/steps", response_model=StepResponse)
def create_step(step: StepCreate, db: Session = Depends(get_db)):
    existing = db.query(Step).filter(Step.id == step.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Step with this ID already exists")
    
    db_step = Step(
        id=step.id,
        title=step.title,
        title_en=step.title_en,
        icon=step.icon,
        order=step.order
    )
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step
