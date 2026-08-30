from typing import Annotated

from fastapi import Depends
from fastapi_clerk_auth import (
    ClerkConfig,
    ClerkHTTPBearer,
    HTTPAuthorizationCredentials,
)

from .utils import get_env_var

clerk_jwks_url = get_env_var("CLERK_JWKS_URL")
clerk_config = ClerkConfig(
    jwks_url=clerk_jwks_url,
)
clerk_auth_guard = ClerkHTTPBearer(
    config=clerk_config,
)

clerk_auth_dependency = Annotated[
    HTTPAuthorizationCredentials, Depends(clerk_auth_guard)
]
