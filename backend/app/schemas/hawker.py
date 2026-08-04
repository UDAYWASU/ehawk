from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class HawkerRegisterRequest(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=150)

    father_name: str | None = None

    date_of_birth: date | None = None

    gender: str | None = None

    aadhaar_number: str = Field(..., pattern=r"^\d{12}$")

    address: str

    city: str

    state: str

    pincode: str = Field(..., pattern=r"^\d{6}$")

    business_name: str

    business_category: str

    cart_name: str

    cart_type: str

    selling_location: str

    latitude: float

    longitude: float

    photo_url: str

    aadhaar_url: str

    cart_photo_url: str


class HawkerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str

    status: str

    hawker_id: str | None

    full_name: str

    city: str

    business_category: str