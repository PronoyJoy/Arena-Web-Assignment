from rest_framework.serializers import ModelSerializer
from api.models import Book, CartItem

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class CartItemSerializer(ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = CartItem
        fields = '__all__'