from django.urls import path
from . import views

urlpatterns = [
    path('books/',views.BooksView,name='books'),
    path('carts/',views.add_to_cart,name='add_to_cart')
]