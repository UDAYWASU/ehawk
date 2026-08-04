from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.core.security import verify_password
from app.models.admin import Admin
from app.models.user import User
from app.services.jwt_service import create_access_token
from datetime import datetime, timezone

from fastapi import HTTPException

from app.models.admin import Admin
from app.models.hawker import Hawker
from app.services.hawker_id_service import generate_hawker_id
from app.services.qr_service import (
    generate_qr,
    upload_qr,
)

def login(
    username: str,
    password: str,
    db: Session,
):

    admin = (
        db.query(Admin)
        .filter(Admin.username == username)
        .first()
    )

    if not admin:
        raise HTTPException(401, "Invalid credentials")

    if password != admin.password:
        raise HTTPException(401, "Invalid credentials")

    user = (
        db.query(User)
        .filter(User.id == admin.user_id)
        .first()
    )

    token = create_access_token(
        {
            "sub": str(user.id),
            "role": "admin",
            "phone": user.phone,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": "admin",
    }

def approve_hawker(
    hawker_uuid,
    current_admin,
    db,
):

    hawker = (
        db.query(Hawker)
        .filter(Hawker.id == hawker_uuid)
        .first()
    )

    if not hawker:
        raise HTTPException(
            404,
            "Hawker not found",
        )

    if hawker.status != "pending":
        raise HTTPException(
            400,
            "Hawker already processed",
        )

    public_id = generate_hawker_id(
        hawker.city,
        db,
    )

    qr = generate_qr(public_id)

    qr_url = upload_qr(
        public_id,
        qr,
    )

    admin = (
        db.query(Admin)
        .filter(Admin.user_id == current_admin.id)
        .first()
    )

    hawker.hawker_id = public_id

    hawker.status = "approved"

    hawker.qr_code_url = qr_url

    hawker.approved_at = datetime.now(timezone.utc)

    hawker.approved_by = admin.id

    db.commit()

    db.refresh(hawker)

    return hawker

from sqlalchemy import func


def dashboard(db):

    return {
        "total": db.query(Hawker).count(),

        "pending": db.query(Hawker)
        .filter(Hawker.status == "pending")
        .count(),

        "approved": db.query(Hawker)
        .filter(Hawker.status == "approved")
        .count(),

        "rejected": db.query(Hawker)
        .filter(Hawker.status == "rejected")
        .count(),
    }

def pending_hawkers(db):

    return (
        db.query(Hawker)
        .filter(Hawker.status == "pending")
        .all()
    )

def approved_hawkers(db):

    return (
        db.query(Hawker)
        .filter(Hawker.status == "approved")
        .all()
    )

def rejected_hawkers(db):

    return (
        db.query(Hawker)
        .filter(Hawker.status == "rejected")
        .all()
    )

def get_hawker(
    hawker_uuid,
    db,
):

    hawker = (
        db.query(Hawker)
        .filter(Hawker.id == hawker_uuid)
        .first()
    )

    if not hawker:
        raise HTTPException(404, "Hawker not found")

    return hawker

from datetime import datetime, timezone


def reject_hawker(
    hawker_uuid,
    reason,
    current_admin,
    db,
):

    hawker = (
        db.query(Hawker)
        .filter(Hawker.id == hawker_uuid)
        .first()
    )

    if not hawker:
        raise HTTPException(
            404,
            "Hawker not found",
        )

    if hawker.status != "pending":
        raise HTTPException(
            400,
            "Already processed",
        )

    admin = (
        db.query(Admin)
        .filter(Admin.user_id == current_admin.id)
        .first()
    )

    hawker.status = "rejected"

    hawker.rejection_reason = reason

    hawker.approved_by = admin.id

    hawker.approved_at = datetime.now(timezone.utc)

    db.commit()

    db.refresh(hawker)

    return hawker

