from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from api.models import Book,CartItem
from api.serializers import BookSerializer,CartItemSerializer
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
        data = request.data #getting the request and extract the data and store it into a variable
        serializer = BookSerializer(data=data)
        if serializer.is_valid():
            serializer.save() #saving the instance
            return Response(serializer.data, status=status.HTTP_201_CREATED) #if works success
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #will show error
        




@api_view(['POST'])
def add_to_cart(request):
    session_id = request.session.session_key
    if session_id is None:
        # Create a new session if it doesn't exist
        request.session.create()
        session_id = request.session.session_key

    book_id = request.data.get('book')
    quantity = request.data.get('quantity')

    book = get_object_or_404(Book, id=book_id)

    cart_item, created = CartItem.objects.get_or_create(session_id=session_id, book=book)

    if not created:
        cart_item.quantity += int(quantity)
    else:
        cart_item.quantity = int(quantity)

    cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data)