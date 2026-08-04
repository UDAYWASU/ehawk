from uuid import uuid4

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.services.jwt_service import create_access_token
from app.services.otp_service import verify_demo_otp


def login_with_otp(
    phone: str,
    otp: str,
    db: Session,
):
    if not verify_demo_otp(otp):
        raise HTTPException(400, "Invalid OTP")

    user = db.query(User).filter(User.phone == phone).first()

    if not user:
        user = User(
            id=uuid4(),
            phone=phone,
            role="hawker",
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token(
        {
            "sub": str(user.id),
            "role": user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
    }