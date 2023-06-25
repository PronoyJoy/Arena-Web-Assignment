from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from api.models import Book,CartItem,Cart
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
        



from django.http import JsonResponse

@api_view(['POST'])
def add_to_cart(request):
    book_ids = request.data.get('book_ids', [])
    quantity = request.data.get('quantity', 1)

    # Check if all book IDs exist in the database
    books = Book.objects.filter(id__in=book_ids)
    if len(books) != len(book_ids):
        invalid_book_ids = set(book_ids) - set(books.values_list('id', flat=True))
        error_message = f"Invalid book IDs: {', '.join(map(str, invalid_book_ids))}"
        return JsonResponse({'error': error_message}, status=400)

    # Proceed with adding the books to the cart
    # Your code to add the books to the cart

    return JsonResponse({'message': 'Books added to cart successfully'}, status=200)


@api_view(['GET'])
def view_cart(request):
    session_id = request.session.session_key
    cart = get_object_or_404(Cart, session_id=session_id)
    serializer = CartItemSerializer(cart.cartitem_set.all(), many=True)
    return Response(serializer.data)