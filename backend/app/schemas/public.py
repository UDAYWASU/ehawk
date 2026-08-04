from pydantic import BaseModel


class VerifyRequest(BaseModel):
    hawker_id: str


class PublicHawkerResponse(BaseModel):
    verified: bool
    message: str
    data: dict | None = None