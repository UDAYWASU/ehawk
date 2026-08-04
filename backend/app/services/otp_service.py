from app.core.config import settings


def send_demo_otp(phone: str):
    return {
        "message": "OTP sent successfully",
        "demo_otp": settings.OTP,
    }


def verify_demo_otp(otp: str) -> bool:
    return otp == settings.OTP