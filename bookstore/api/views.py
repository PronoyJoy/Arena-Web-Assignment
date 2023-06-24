from django.shortcuts import render
from rest_framework.decorators import api_view
from api.models import Book
from api.serializers import BookSerializer
from rest_framework.response import Response

# Create your views here.


@api_view(['GET']) #booklist
def getBooks(request):
    
    books = Book.objects.all() #getting all the data
    serializer = BookSerializer(books,many= True) #serializing the queryset

    return Response(serializer.data) #sending response in json





