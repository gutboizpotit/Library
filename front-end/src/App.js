import {Routes , Route } from 'react-router-dom'

import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Books from './components/Books.js'
import Book from './components/Book.js'
import Test from './Test/Test.js'
import './App.css';
import BookDetail from './components/BookDetail.js'

function App() {
  return (
    <div className="App">
       <Routes> 
        <Route path = '/' element = {<Home />}/>
        <Route path = "/login" element = {<Login />} />
        <Route path = '/register' element = {<Register />} /> 
        <Route path='/test' element={<Test/>} />
        <Route path="/:id" element={<BookDetail/>} />
        <Route path='/books' element={<Books/>}/>
        <Route path='/books/:id' element={<Book></Book>} />
      </Routes>
    </div>
  );
}

export default App;
