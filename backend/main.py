from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from database import engine, Base, SessionLocal
from models import Building as DBBuilding, Room, Step as DBStep, Article

# Создаём таблицы при первом запросе
tables_created = False
def create_tables_if_needed():
    global tables_created
    if not tables_created:
        Base.metadata.create_all(bind=engine)
        tables_created = True

app = FastAPI(title="Navigator API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# PYDANTIC SCHEMAS (с orm_mode=True для Pydantic 1.x)
# =============================================================================
class BuildingBase(BaseModel):
    name: str
    address: str
    lat: float
    lon: float
    class Config:
        orm_mode = True

class BuildingCreate(BuildingBase):
    pass

class BuildingResponse(BuildingBase):
    id: int

class StepBase(BaseModel):
    title: str
    icon: str
    order: int = 0
    class Config:
        orm_mode = True

class StepCreate(StepBase):
    id: int
    title_en: Optional[str] = None

class StepResponse(StepBase):
    id: int
    title_en: Optional[str] = None

# =============================================================================
# ЗАВИСИМОСТИ
# =============================================================================
def get_db():
    create_tables_if_needed()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =============================================================================
# ENDPOINTS
# =============================================================================
@app.get("/health")
def health_check():
    create_tables_if_needed()
    return {"status": "ok"}

@app.get("/api/buildings", response_model=List[BuildingResponse])
def get_buildings(db: Session = Depends(get_db)):
    return db.query(DBBuilding).all()

@app.post("/api/buildings", response_model=BuildingResponse)
def create_building(building: BuildingCreate, db: Session = Depends(get_db)):
    db_building = DBBuilding(**building.dict())
    db.add(db_building)
    db.commit()
    db.refresh(db_building)
    return db_building

@app.get("/api/steps", response_model=List[StepResponse])
def get_steps(db: Session = Depends(get_db)):
    return db.query(DBStep).order_by(DBStep.order).all()

@app.get("/api/steps/{step_id}/articles")
def get_step_articles(step_id: int, db: Session = Depends(get_db)):
    return db.query(Article).filter(Article.step_id == step_id).order_by(Article.order).all()

@app.post("/api/steps", response_model=StepResponse)
def create_step(step: StepCreate, db: Session = Depends(get_db)):
    existing = db.query(DBStep).filter(DBStep.id == step.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Step with this ID already exists")
    db_step = DBStep(**step.dict())
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step
