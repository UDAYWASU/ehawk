from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_hawker
from app.schemas.hawker import HawkerRegisterRequest
from app.services.hawker_service import (
    get_profile,
    register_hawker,
    update_profile,
)

router = APIRouter(
    prefix="/hawker",
    tags=["Hawker"],
)

@router.post("/register")
def register(
    data: HawkerRegisterRequest,
    current_user=Depends(require_hawker),
    db: Session = Depends(get_db),
):

    return register_hawker(
        current_user=current_user,
        data=data,
        db=db,
    )

@router.get("/profile")
def profile(
    current_user=Depends(require_hawker),
    db: Session = Depends(get_db),
):

    return get_profile(
        current_user=current_user,
        db=db,
    )

@router.put("/profile")
def update(
    data: HawkerRegisterRequest,
    current_user=Depends(require_hawker),
    db: Session = Depends(get_db),
):

    return update_profile(
        current_user=current_user,
        data=data,
        db=db,
    )