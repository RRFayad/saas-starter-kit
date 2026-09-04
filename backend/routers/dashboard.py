from fastapi import APIRouter
from starlette import status

from ..auth.auth import current_user_dependency

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/", status_code=status.HTTP_200_OK)
def get_dashboard_data():
    return {"dashboard": "Protected Data"}
