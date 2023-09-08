from tortoise.models import Model
from tortoise import fields
# from enum import Enum

# class BookStatusChoices(str, Enum):
#     TO_READ = "to-read"
#     IN_PROGRESS = "in-progress"
#     COMPLETED = "completed"


class Book(Model):
    name = fields.CharField(max_length=255)
    # status = fields.CharEnumField(BookStatusChoices, max_length=255)
    reading= fields.BooleanField(default=False)
    to_read= fields.BooleanField(default=False)
    completed= fields.BooleanField(default=False)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    
    def __str__(self):
        return self.name
