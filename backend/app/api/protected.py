from fastapi import APIRouter, Depends

from app.core.security import (
    get_current_user,
    require_admin,
    require_hawker,
)

router = APIRouter(
    prefix="/protected",
    tags=["Protected"],
)

@router.get("/me")
def me(
    current_user=Depends(get_current_user),
):
    return current_user

@router.get("/hawker")
def hawker(
    current_user=Depends(require_hawker),
):
    return {
        "message": "Welcome Hawker",
        "phone": current_user.phone,
    }

@router.get("/admin")
def admin(
    current_user=Depends(require_admin),
):
    return {
        "message": "Welcome Admin"
    }