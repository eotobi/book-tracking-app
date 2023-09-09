from fastapi.testclient import TestClient

from .main import app
from models import Book
from serializers import BookIn_Pydantic, BookOut_Pydantic

client = TestClient(app)

some_book=Book(1,"Dreams From My Father",False,True,False)

def test_add_book():
    response = client.get("/api/v1/add-book/",some_book)
    assert response.status_code == 201
    assert response.json() == {"name": "Dreams From My Father",
                               "reading": False,
                               "to_read": True,
                               "completed": False
                               }
