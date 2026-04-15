from fastapi import FastAPI, Depends, Body
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models import Building, Room, Step, Article
from fastapi.middleware.cors import CORSMiddleware

# 🔥 Создаём таблицы в базе при запуске
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Navigator API")

# 🔥 Разрешаем запросы с фронтенда (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Зависимость для подключения к БД
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. Проверка работы сервера
@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Server is running"}

# 2. Получить все корпуса
@app.get("/api/buildings")
def get_buildings(db: Session = Depends(get_db)):
    buildings = db.query(Building).all()
    return buildings

# 3. Добавить корпус
@app.post("/api/buildings")
def create_building(name: str, address: str, lat: float, lon: float, db: Session = Depends(get_db)):
    new_building = Building(name=name, address=address, lat=lat, lon=lon)
    db.add(new_building)
    db.commit()
    db.refresh(new_building)
    return new_building

# =============================================================================
# ЭНДПОИНТ: Получить все шаги
# =============================================================================
@app.get("/api/steps")
def get_steps(db: Session = Depends(get_db)):
    steps = db.query(Step).order_by(Step.order).all()
    return steps

# =============================================================================
# ЭНДПОИНТ: Получить статьи конкретного шага
# =============================================================================
@app.get("/api/steps/{step_id}/articles")
def get_step_articles(step_id: int, db: Session = Depends(get_db)):
    articles = db.query(Article).filter(
        Article.step_id == step_id
    ).order_by(Article.order).all()
    return articles

# =============================================================================
# ЭНДПОИНТ: Добавить новый шаг адаптации (ОСТАВЬ ТОЛЬКО ЭТУ ФУНКЦИЮ!)
# =============================================================================
@app.post("/api/steps")
def create_step(
    id: int,
    title: str,
    icon: str,
    title_en: str = None,
    order: int = 0,
    db: Session = Depends(get_db)
):
    # Проверяем, нет ли уже шага с таким id
    existing = db.query(Step).filter(Step.id == id).first()
    if existing:
        return {"error": "Step with this ID already exists"}
    
    step = Step(
        id=id,
        title=title,
        title_en=title_en,
        icon=icon,
        order=order
    )
    db.add(step)
    db.commit()
    db.refresh(step)
    return step
