from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.auth import (
    AuthResponse,
    SendOTPRequest,
    VerifyOTPRequest,
)
from app.services.auth_service import login_with_otp
from app.services.otp_service import send_demo_otp

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/send-otp")
def send_otp(data: SendOTPRequest):
    return send_demo_otp(data.phone)


@router.post("/verify-otp", response_model=AuthResponse)
def verify_otp(
    data: VerifyOTPRequest,
    db: Session = Depends(get_db),
):
    return login_with_otp(
        phone=data.phone,
        otp=data.otp,
        db=db,
    )