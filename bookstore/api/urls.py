from django.urls import path
from . import views

urlpatterns = [
    path('books/',views.BooksView,name='books'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('view-cart/', views.view_cart, name='view_cart'),
]