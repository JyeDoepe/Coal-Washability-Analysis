from app.functions.process_data import process_data
from app.functions.ash_to_sg import ash_to_sg

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

@app.post("/add_ash")
async def add_ash(request: Request):
    data = await request.json()
    sample_data = pd.DataFrame(data['data'])
    res = ash_to_sg(sample_data, float(data['ash']))
    return res