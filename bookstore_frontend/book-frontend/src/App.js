import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add-book">Add Book</Link>
            </li>
            
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
