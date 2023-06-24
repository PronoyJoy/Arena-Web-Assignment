import React, { useEffect, useState } from 'react';
import '../App.css';


const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books from the API endpoint
    fetch('/api/books/')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className='app-container'>
      <h1>List of Available Books</h1>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Price: ${book.price}</p>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;