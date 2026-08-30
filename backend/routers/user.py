from fastapi import APIRouter, HTTPException
from sqlalchemy import select
from starlette import status

from ..auth.auth import clerk_auth_dependency
from ..db.database import db_dependency
from ..db.models import User

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/", status_code=status.HTTP_200_OK)
def get_current_user(
    db: db_dependency,
    credentials: clerk_auth_dependency,
):
    if credentials.decoded is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )

    clerk_id = credentials.decoded["sub"]
    user = db.scalar(select(User).where(User.clerk_id == clerk_id))

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {"id": user.id, "name": user.name, "email": user.email}
