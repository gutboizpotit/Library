import React from 'react';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom'
import './../css/Bookdetail.css'

function Bo() {

  const [book, setBook] = useState({});
  const params = useParams()
  const id = 3

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:8080/books/${id}`);
      const data = await response.json();
      console.log(data)
      setBook(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div>
        
        <h1 className='tt' >Thông tin sách</h1>
          <div className='book-detail'>
            <img src={book.cover} className='book-cover'/>
            <div className='book-info'>
              <p>Tên sách: {book.title}</p>
              <p>Tác giả: {book.author}</p>
              <p>Mô tả: {book.des}</p>
              <p>Số trang: {book.page}</p>
              <p>Đã bán: {book.sold}</p>
            </div>
          </div>
      </div>
  );
};

export default Bo;
