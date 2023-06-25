
import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'publisher':
        setPublisher(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('/api/books/', { title, author, publisher, price, description })
      .then(response => {
        console.log(response.data);
        alert('Book added successfully!');
        setTitle('');
        setAuthor('');
        setPublisher('');
        setPrice('');
        setDescription('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={author} onChange={handleChange} required />
        </div>
        <div>
          <label>Publisher:</label>
          <input type="text" name="publisher" value={publisher} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={price} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={description} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
