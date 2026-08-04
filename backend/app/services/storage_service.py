import uuid

from fastapi import UploadFile

from app.core.supabase import supabase


BUCKET_NAME = "ehawk"


def upload_image(file: UploadFile, folder: str) -> str:
    """
    Uploads an image to Supabase Storage and returns its public URL.
    """

    extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"

    file_path = f"{folder}/{filename}"

    file_bytes = file.file.read()

    supabase.storage.from_(BUCKET_NAME).upload(
        path=file_path,
        file=file_bytes,
        file_options={
            "content-type": file.content_type,
        },
    )

    public_url = (
        supabase.storage
        .from_(BUCKET_NAME)
        .get_public_url(file_path)
    )

    return public_url