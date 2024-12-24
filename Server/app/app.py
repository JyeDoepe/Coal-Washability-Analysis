from app.functions.process_data import process_data

from fastapi import Request, FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(request: Request):
    return {"message": "Hello World"}

@app.get("/sample")
def sample(request: Request):
    sample_data = pd.read_csv("app/data/sample1.csv")
    sample_data = process_data(sample_data)
    return sample_data.to_dict()