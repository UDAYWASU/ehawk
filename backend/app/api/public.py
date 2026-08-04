from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.public import VerifyRequest
from app.services.public_service import verify_hawker

router = APIRouter(
    prefix="/public",
    tags=["Public"],
)


@router.post("/verify")
def verify(
    data: VerifyRequest,
    db: Session = Depends(get_db),
):
    return verify_hawker(
        data.hawker_id,
        db,
    )


@router.get("/search/{hawker_id}")
def search(
    hawker_id: str,
    db: Session = Depends(get_db),
):
    return verify_hawker(
        hawker_id,
        db,
    )