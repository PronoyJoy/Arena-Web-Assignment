from django.shortcuts import render
from rest_framework.decorators import api_view
from api.models import Book
from api.serializers import BookSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


@api_view(['GET','POST']) #booklist
def BooksView(request):
    
    if request.method == 'GET':
        books = Book.objects.all() #getting all the data
        serializer = BookSerializer(books,many= True) #serializing the queryset
        return Response(serializer.data) #sending response in json
    
    if request.method == 'POST':
        data = request.data
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



