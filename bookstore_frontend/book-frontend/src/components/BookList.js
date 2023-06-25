

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';



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
 
  

  return (
    <div>
      
      <Link to="/cart">Added To Cart</Link>


      <h1>Book List</h1>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>{book.price}</p>
          <p>{book.description}</p>
      
        </div>
      ))}

 
     
    </div>
  );
}

export default BookList;
