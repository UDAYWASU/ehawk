from sqlalchemy import (
    Column,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    Text,
)

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func, text

from app.core.database import Base


class Hawker(Base):
    __tablename__ = "hawkers"

    id = Column(
    UUID(as_uuid=True),
    primary_key=True,
    server_default=text("gen_random_uuid()")
)

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    hawker_id = Column(String(20), unique=True)

    status = Column(String(20), default="pending")

    full_name = Column(String(150), nullable=False)

    father_name = Column(String(150))

    date_of_birth = Column(Date)

    gender = Column(String(20))

    aadhaar_number = Column(String(12))

    address = Column(Text)

    city = Column(String(100))

    state = Column(String(100))

    pincode = Column(String(6))

    business_name = Column(String(150))

    business_category = Column(String(100))

    cart_name = Column(String(150))

    cart_type = Column(String(100))

    selling_location = Column(Text)

    latitude = Column(Numeric(10, 8))

    longitude = Column(Numeric(11, 8))

    photo_url = Column(Text)

    aadhaar_url = Column(Text)

    cart_photo_url = Column(Text)

    qr_code_url = Column(Text)

    approved_by = Column(
        UUID(as_uuid=True),
        ForeignKey("admins.id"),
    )

    approved_at = Column(DateTime(timezone=True))

    rejection_reason = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )