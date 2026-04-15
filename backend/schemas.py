from pydantic import BaseModel
from typing import Optional

# =============================================================================
# BUILDINGS
# =============================================================================
class BuildingBase(BaseModel):
    name: str
    address: str
    lat: float
    lon: float

class BuildingCreate(BuildingBase):
    pass

class Building(BuildingBase):
    id: int
    
    class Config:
        from_attributes = True

# =============================================================================
# STEPS
# =============================================================================
class StepBase(BaseModel):
    title: str
    icon: str
    order: int = 0

class StepCreate(StepBase):
    id: int
    title_en: Optional[str] = None

class Step(StepBase):
    id: int
    title_en: Optional[str] = None
    
    class Config:
        from_attributes = True

# =============================================================================
# ARTICLES
# =============================================================================
class ArticleBase(BaseModel):
    title: str
    content: str
    content_en: Optional[str] = None
    order: int = 0

class ArticleCreate(ArticleBase):
    step_id: int

class Article(ArticleBase):
    id: int
    step_id: int
    
    class Config:
        from_attributes = True
