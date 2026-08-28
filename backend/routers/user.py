from starlette import status
from sqlalchemy import select
from fastapi import APIRouter, HTTPException

from ..models import User
from ..database import db_dependency

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/", status_code=status.HTTP_200_OK)
def get_user_info(db: db_dependency):
    user = db.scalar(select(User))
    return user
