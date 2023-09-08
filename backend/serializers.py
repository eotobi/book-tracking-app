from models import Book
from tortoise.contrib.pydantic import pydantic_model_creator

BookIn_Pydantic = pydantic_model_creator(
    Book,
    name="BookIn"
)

BookOut_Pydantic = pydantic_model_creator(
    Book,
    name="BookOut",
    exclude=('id', 'created_at', 'updated_at',)
)
