from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.models.user import User

security = HTTPBearer()

def decode_token(token: str):

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        return payload

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):

    payload = decode_token(credentials.credentials)

    user = (
        db.query(User)
        .filter(User.id == payload["sub"])
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return user

def require_admin(
    current_user: User = Depends(get_current_user),
):

    if current_user.role != "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin access required",
        )

    return current_user

def require_hawker(
    current_user: User = Depends(get_current_user),
):

    if current_user.role != "hawker":

        raise HTTPException(
            status_code=403,
            detail="Hawker access required",
        )

    return current_user

from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
):
    return pwd_context.verify(
        plain_password,
        hashed_password,
    )