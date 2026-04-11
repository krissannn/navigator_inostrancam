from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
from models import Building, Room
from fastapi.middleware.cors import CORSMiddleware

# 🔥 Создаём таблицы в базе при запуске
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Navigator API")

# 🔥 Разрешаем запросы с фронтенда (CORS) — без этого не заработает!
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

# 3. Добавить корпус (для наполнения базы)
@app.post("/api/buildings")
def create_building(name: str, address: str, lat: float, lon: float, db: Session = Depends(get_db)):
    new_building = Building(name=name, address=address, lat=lat, lon=lon)
    db.add(new_building)
    db.commit()
    db.refresh(new_building)
    return new_building
