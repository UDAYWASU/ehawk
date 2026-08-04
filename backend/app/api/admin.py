from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.admin import AdminLoginRequest
from app.services.admin_service import login

from app.core.security import require_admin
from app.services.admin_service import approve_hawker

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)

from app.services.admin_service import (
    dashboard,
    get_hawker,
    get_hawker,
    rejected_hawkers,
    pending_hawkers,
    approved_hawkers,
    reject_hawker
)

@router.post("/login")
def admin_login(
    data: AdminLoginRequest,
    db: Session = Depends(get_db),
):
    return login(
        data.username,
        data.password,
        db,
    )

@router.post("/approve/{hawker_uuid}")
def approve(
    hawker_uuid: str,
    current_admin=Depends(require_admin),
    db: Session = Depends(get_db),
):

    return approve_hawker(
        hawker_uuid,
        current_admin,
        db,
    )

@router.get("/dashboard")
def get_dashboard(
    current_admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    return dashboard(db)

@router.get("/pending")
def pending(
    current_admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    return pending_hawkers(db)

@router.get("/approved")
def approved(
    current_admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    return approved_hawkers(db)

@router.get("/rejected")
def rejected(
    current_admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    return rejected_hawkers(db)

@router.get("/hawker/{hawker_uuid}")
def details(
    hawker_uuid: str,
    current_admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    return get_hawker(
        hawker_uuid,
        db,
    )

from pydantic import BaseModel


class RejectRequest(BaseModel):
    reason: str

@router.post("/reject/{hawker_uuid}")
def reject(
    hawker_uuid: str,
    data: RejectRequest,
    current_admin=Depends(require_admin),
    db: Session = Depends(get_db),
):

    return reject_hawker(
        hawker_uuid,
        data.reason,
        current_admin,
        db,
    )