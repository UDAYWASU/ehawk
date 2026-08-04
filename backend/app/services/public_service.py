from app.models.hawker import Hawker


def verify_hawker(hawker_id: str, db):

    hawker = (
        db.query(Hawker)
        .filter(Hawker.hawker_id == hawker_id)
        .first()
    )

    if not hawker:
        return {
            "verified": False,
            "message": "Hawker not found",
            "data": None,
        }

    if hawker.status != "approved":
        return {
            "verified": False,
            "message": f"Hawker is {hawker.status}",
            "data": None,
        }

    return {
        "verified": True,
        "message": "Verified",
        "data": {
            "hawker_id": hawker.hawker_id,
            "name": hawker.full_name,
            "business": hawker.business_category,
            "city": hawker.city,
            "photo": hawker.photo_url,
            "status": hawker.status,
        },
    }