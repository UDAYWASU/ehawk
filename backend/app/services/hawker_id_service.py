from sqlalchemy import text


def generate_hawker_id(city: str, db):

    result = db.execute(
        text("SELECT nextval('hawker_id_sequence')")
    )

    sequence = result.scalar()

    city_code = city[:3].upper()

    return f"{city_code}-HWK-{sequence:08d}"