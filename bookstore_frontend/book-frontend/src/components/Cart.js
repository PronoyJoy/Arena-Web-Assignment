import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios
      .get('http://localhost:8000/api/view-cart/')
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        <ul>
          {cartItems.map(cartItem => (
            <li key={cartItem.id}>
              <strong>Title:</strong> {cartItem.book.title}, <strong>Quantity:</strong> {cartItem.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
