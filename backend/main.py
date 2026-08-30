from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import user
from .utils import get_env_var

frontend_url = get_env_var("FRONTEND_URL")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/healthy")
def health_check():
    return {"status": "Healthy"}


app.include_router(user.router)
