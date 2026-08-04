from app.models.hawker import Hawker
from app.schemas.hawker import HawkerRegisterRequest
from fastapi import HTTPException
from fastapi import HTTPException, UploadFile


from app.services.storage_service import upload_image
def register_hawker(
    current_user,
    data: HawkerRegisterRequest,
    profile_photo: UploadFile,
    aadhaar_photo: UploadFile,
    cart_photo: UploadFile,
    db,
):
    existing = (
        db.query(Hawker)
        .filter(Hawker.user_id == current_user.id)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="You have already submitted your registration.",
        )

    photo_url = upload_image(
        profile_photo,
        f"hawkers/{current_user.id}/profile",
    )

    aadhaar_url = upload_image(
        aadhaar_photo,
        f"hawkers/{current_user.id}/aadhaar",
    )

    cart_photo_url = upload_image(
        cart_photo,
        f"hawkers/{current_user.id}/cart",
    )

    hawker = Hawker(
        user_id=current_user.id,

        status="pending",

        full_name=data.full_name,
        father_name=data.father_name,
        date_of_birth=data.date_of_birth,
        gender=data.gender,

        aadhaar_number=data.aadhaar_number,

        address=data.address,
        city=data.city,
        state=data.state,
        pincode=data.pincode,

        business_name=data.business_name,
        business_category=data.business_category,

        cart_name=data.cart_name,
        cart_type=data.cart_type,

        selling_location=data.selling_location,

        latitude=data.latitude,
        longitude=data.longitude,

        photo_url=photo_url,
        aadhaar_url=aadhaar_url,
        cart_photo_url=cart_photo_url,
    )

    db.add(hawker)
    db.commit()
    db.refresh(hawker)

    return hawker

def get_profile(
    current_user,
    db,
):

    return (
        db.query(Hawker)
        .filter(Hawker.user_id == current_user.id)
        .first()
    )

def update_profile(
    current_user,
    data,
    db,
):

    hawker = (
        db.query(Hawker)
        .filter(Hawker.user_id == current_user.id)
        .first()
    )

    if not hawker:
        raise HTTPException(404, "Registration not found")

    if hawker.status == "approved":
        raise HTTPException(
            403,
            "Approved registrations cannot be edited.",
        )

    for key, value in data.model_dump().items():
        setattr(hawker, key, value)

    db.commit()

    db.refresh(hawker)

    return hawker

