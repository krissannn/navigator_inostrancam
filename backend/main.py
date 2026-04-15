from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models import Building, Room, Step, Article
from schemas import BuildingCreate, Building as BuildingSchema, StepCreate, Step as StepSchema
from fastapi.middleware.cors import CORSMiddleware

# 🔥 Создаём таблицы
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
    return {"status": "ok", "message": "Server is running"}

# Получить все корпуса
@app.get("/api/buildings", response_model=list[BuildingSchema])
def get_buildings(db: Session = Depends(get_db)):
    buildings = db.query(Building).all()
    return buildings

# Добавить корпус
@app.post("/api/buildings", response_model=BuildingSchema)
def create_building(building: BuildingCreate, db: Session = Depends(get_db)):
    new_building = Building(
        name=building.name,
        address=building.address,
        lat=building.lat,
        lon=building.lon
    )
    db.add(new_building)
    db.commit()
    db.refresh(new_building)
    return new_building

# Получить все шаги
@app.get("/api/steps", response_model=list[StepSchema])
def get_steps(db: Session = Depends(get_db)):
    steps = db.query(Step).order_by(Step.order).all()
    return steps

# Получить статьи шага
@app.get("/api/steps/{step_id}/articles")
def get_step_articles(step_id: int, db: Session = Depends(get_db)):
    articles = db.query(Article).filter(
        Article.step_id == step_id
    ).order_by(Article.order).all()
    return articles

# Добавить шаг
@app.post("/api/steps", response_model=StepSchema)
def create_step(step: StepCreate, db: Session = Depends(get_db)):
    existing = db.query(Step).filter(Step.id == step.id).first()
    if existing:
        return {"error": "Step with this ID already exists"}
    
    new_step = Step(
        id=step.id,
        title=step.title,
        title_en=step.title_en,
        icon=step.icon,
        order=step.order
    )
    db.add(new_step)
    db.commit()
    db.refresh(new_step)
    return new_step
