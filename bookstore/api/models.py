from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    publisher = models.CharField(max_length=255)
    price = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return self.title
    
class CartItem(models.Model):
    session_id = models.CharField(max_length=40) #using session id to distinguish
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"Book: {self.book.title}, Quantity: {self.quantity}"

