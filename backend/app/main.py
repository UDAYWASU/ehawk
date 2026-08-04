from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.test import router as test_router
from app.api.protected import router as protected_router
from app.api.hawker import router as hawker_router
from app.api.admin import router as admin_router
from app.api.public import router as public_router


app = FastAPI(
    title="Hawker Identification API",
    version="1.0.0",
)


origins = [
    "http://localhost:5173",
    "https://your-vercel-domain.vercel.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(test_router)
app.include_router(auth_router)
app.include_router(protected_router)
app.include_router(hawker_router)
app.include_router(admin_router)
app.include_router(public_router)


@app.get("/")
def root():
    return {"message": "API Running"}