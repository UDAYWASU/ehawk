import io

import qrcode

from app.core.config import settings
from app.core.supabase import supabase
from storage3.types import FileOptions

def generate_qr(hawker_id: str):

    qr = qrcode.QRCode(
        version=3,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )

    qr.add_data(hawker_id)

    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    buffer = io.BytesIO()

    img.save(buffer, format="PNG")

    buffer.seek(0)

    return buffer

def upload_qr(
    hawker_id: str,
    buffer,
):

    path = f"qr/{hawker_id}.png"

    supabase.storage.from_(settings.SUPABASE_BUCKET).upload(
        path,
        buffer.getvalue(),
        file_options=FileOptions(
            content_type="image/png"
        ),
    )

    return (
        f"{settings.SUPABASE_URL}/storage/v1/object/public/"
        f"{settings.SUPABASE_BUCKET}/{path}"
    )