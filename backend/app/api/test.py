from fastapi import APIRouter
from sqlalchemy import text

from app.core.database import SessionLocal

router = APIRouter(prefix="/test", tags=["Testing"])


@router.get("/users")
def get_users():

    db = SessionLocal()

    try:

        result = db.execute(text("SELECT * FROM users"))

        rows = result.mappings().all()

        return rows

    finally:
        db.close()