from fastapi import FastAPI, status
from tortoise.contrib.fastapi import register_tortoise
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from models import Book
from serializers import BookIn_Pydantic, BookOut_Pydantic

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_tortoise(
    app,
    db_url='sqlite://db.sqlite3',
    modules={'models': ['main']},
    generate_schemas=True,
    add_exception_handlers=True
)


@app.post('/api/v1/add-book/')
async def add_book(book: BookOut_Pydantic):
    book_obj = Book(
        name=book.name,
        reading=book.reading,
        to_read=book.to_read,
        completed=book.completed
    )
    await book_obj.save()
    book = await BookIn_Pydantic.from_tortoise_orm(book_obj)
    json_data = jsonable_encoder(book)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=json_data
    )


@app.get('/api/v1/books-list/')
async def books_list():
    books = await Book.all()
    # return books
    json_data = jsonable_encoder(books)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=json_data
    )


@app.get('/api/v1/book-details/{id}')
async def book_details(id: int):
    book = await Book.get(id=id)
    json_data = jsonable_encoder(book)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=json_data
    )


@app.delete('/api/v1/delete-book/{id}')
async def delete_book(id: int):
    book = await Book.get(id=id)
    await book.delete()
    return {'details': "deleted"}


@app.put('/api/v1/book-update/{id}')
async def update_book(id: int, book_info: BookOut_Pydantic):
    book = await Book.get(id=id)
    book.name = book_info.name
    book.reading=book_info.reading
    book.to_read=book_info.to_read,
    book.completed=book_info.completed
    await book.save()
    book = await BookIn_Pydantic.from_tortoise_orm(book)
    json_data = jsonable_encoder(book)
    return JSONResponse(
        status_code=status.HTTP_201_CREATED,
        content=json_data
    )
