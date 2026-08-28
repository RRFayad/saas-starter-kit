from starlette import status
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/", status_code=status.HTTP_200_OK)
# TODO: Bind with real user data
def get_user_info():
    return {"id": 1, "name": "Test User", "email": "test@example.com"}
