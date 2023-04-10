from datetime import datetime
from dateutil import relativedelta
from typing import Any

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse

from services.database import JSONDatabase
from logging import getLogger

#cross-origin requests: handles requests from different ports or domains
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

database: JSONDatabase[list[dict[str, Any]]] = JSONDatabase(r"../api/data/database.json")

@app.on_event("startup")
def on_startup() -> None:
    if "posts" not in database:
        print("Adding posts entry to database")
        database["posts"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    log = getLogger(__name__)
    log.info('Hello') 
    database.close()



@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function.
    """
    now = datetime.now().replace(microsecond=0)
    post = {
        "name": name,
        "message": message,
        "time": now.isoformat(),
    }
    database["posts"].append(post)

    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


# TODO: add another API route with a query parameter to retrieve quotes based on max age

@app.get("/time/{age}")
def get_message(age: int ) -> list:
    """
    Process retrieving quotes based on max age
    """
    list_posts = []
    now = datetime.now().replace(microsecond=0)
    for data in database["posts"]:
        # Finds the difference between the 2 dates!
        delta = relativedelta.relativedelta(now, datetime.fromisoformat(data["time"]))
        if delta.days + 30*delta.months + 365*delta.years <= age:
            list_posts.append(data)
    return list_posts