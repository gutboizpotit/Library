import React, { useState, useEffect } from 'react';
import "./../css/Home.css"
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const [books, setBooks] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const check = localStorage.getItem("checklogin")
  const role = localStorage.getItem("role")

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookClick = (id) => {
    const url = "/" + id
    navigate(url)
  };

  const HandleOnClick = () => {
    localStorage.setItem("checklogin","false")
  }

  const renderBookRows = () => {
    const rows = [];
    const booksPerRow = 4;

    for (let i = 0; i < books.length; i += booksPerRow) {
      const row = books.slice(i, i + booksPerRow);

      rows.push(
        <div key={i} className="row">
          {row.map((book) => (
            <div key={book.id} className="book" onClick={ () => handleBookClick(book.id)}>
            <img src={book.cover} />
              <h3>{book.title}</h3>
              <p>Tác giả: {book.author}</p>
              <p>Năm xuất bản: {book.date}  </p>
              <p>Đã bán: {book.sold}  </p>
            </div>
          ))}
        </div>
      );
    }

    return rows;
  };

  return (
    <div>
      { check !== "true" ? (
        <div className="navbar">
        <div className="navbar-brand">Library Local</div>
       <div className="navbar-options">
      <a href="/login">Đăng nhập</a>
      <a href="/register">Đăng ký</a>
      </div>
      </div>
    ) : (
      <div className="navbar">
        <div className="navbar-brand">Library Local</div>
       <div className="navbar-options">
      <a href="/" onClick={HandleOnClick}>Logout</a>
      { role === "admin" && (
        <div className="navigation-bar">
          <nav className="nav-links">
          <a href="/books">Xem danh sách sách</a>
          </nav>
      </div>)}

      </div>
      </div>
    )}
      <h1>Thư viện sách</h1>
      {books.length > 0 ? (
        <div className="book-container">{renderBookRows()}</div>
      ) : (
        <p>Không có sách nào trong thư viện.</p>
      )}
    </div>
  );
}

export default Home;
