from fastapi import FastAPI

from .routers import user

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/healthy")
def health_check():
    return {"status": "Healthy"}


app.include_router(user.router)
