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

from datetime import date

from fastapi import (
    APIRouter,
    Depends,
    Form,
    File,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_hawker

from app.schemas.hawker import HawkerRegisterRequest

from app.services.hawker_service import (
    register_hawker,
    get_profile,
    update_profile,
)

router = APIRouter(
    prefix="/hawker",
    tags=["Hawker"],
)


@router.post("/register")
def register(
    full_name: str = Form(...),
    father_name: str | None = Form(None),
    date_of_birth: date | None = Form(None),
    gender: str | None = Form(None),

    aadhaar_number: str = Form(...),

    address: str = Form(...),

    city: str = Form(...),

    state: str = Form(...),

    pincode: str = Form(...),

    business_name: str = Form(...),

    business_category: str = Form(...),

    cart_name: str = Form(...),

    cart_type: str = Form(...),

    selling_location: str = Form(...),

    latitude: float = Form(...),

    longitude: float = Form(...),

    profile_photo: UploadFile = File(...),

    aadhaar_photo: UploadFile = File(...),

    cart_photo: UploadFile = File(...),

    current_user=Depends(require_hawker),

    db: Session = Depends(get_db),
):

    data = HawkerRegisterRequest(
        full_name=full_name,
        father_name=father_name,
        date_of_birth=date_of_birth,
        gender=gender,
        aadhaar_number=aadhaar_number,
        address=address,
        city=city,
        state=state,
        pincode=pincode,
        business_name=business_name,
        business_category=business_category,
        cart_name=cart_name,
        cart_type=cart_type,
        selling_location=selling_location,
        latitude=latitude,
        longitude=longitude,

        # Temporary placeholders
        photo_url="",
        aadhaar_url="",
        cart_photo_url="",
    )

    return register_hawker(
        current_user=current_user,
        data=data,
        profile_photo=profile_photo,
        aadhaar_photo=aadhaar_photo,
        cart_photo=cart_photo,
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