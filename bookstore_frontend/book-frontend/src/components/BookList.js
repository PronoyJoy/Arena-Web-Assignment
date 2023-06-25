import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get('http://localhost:8000/api/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleAddToCart = (bookId) => {
    axios
      .post('http://localhost:8000/api/add-to-cart/', { book_ids: [bookId] })
      .then(response => {
        console.log(response.data); // Success message
        // Perform any additional actions, such as updating the cart state
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Book List</h1>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>{book.price}</p>
          <p>{book.description}</p>
          <button onClick={() => handleAddToCart(book.id)}>Add to Cart</button>
        </div>
      ))}
      <Link to="/cart">View Cart</Link>
    </div>
  );
}

export default BookList;
