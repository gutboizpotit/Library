import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import './../css/Login.css'
import { Link , useNavigate } from 'react-router-dom';
import Home from './Home.js'

function RegisterForm() { 
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === '' || email === '' || username === '' || password === '' || confirmPassword === '') {
        setIsError(true)
        setMessages("Vui lòng điền đầy đủ thông tin!")
        setErrorMessage('Vui lòng điền đầy đủ thông tin');
        return;
    }
    if (username.includes(' ') || password.includes(' ')) {
        setIsError(true)
        setMessages("Tên người dùng và mật khẩu không được chứa khoảng trắng!")
        setErrorMessage('Tên người dùng và mật khẩu không được chứa khoảng trắng');
        return;
    }
    if (password !== confirmPassword ){
        setIsError(true)
        setMessages("Xác nhận mật khẩu không trùng khớp với mật khẩu!")
        setErrorMessage("Xác nhận mật khẩu không trùng khớp với mật khẩu!")
        return;
    }
    try{
        const resp = await fetch(`http://localhost:8080/users/${username}`)
        const data = await resp.json()
        console.log(data)
        if( data !== null ){
            setIsError(true)
            setMessages("Tài khoản đã tồn tại!")
            console.log("tài khoản đã tồn tại!")
            return;
        }
    } catch(err){
        console.log(err)
    }
    navigate("/login")
    setIsError(false)
    try {
        const position = false;
        const response = await fetch('http://localhost:8080/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name , email , username , password , position }),
        });
        if (response.ok) {
            console.log('Đăng ký với tên người dùng:', username, 'và mật khẩu:', password);
        };
    } catch(err){
        console.log(err)
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form-login'>
        <input
          type="text"
          className='input-login'
          value={name}
          onChange={handleNameChange}
          placeholder="Tên người dùng"
          required
        />
        <input
          type="text"
          className='input-login'
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          className='input-login'
          value={username}
          onChange={handleUsernameChange}
          placeholder="Tài khoản"
          required
        />
        <input
          type="password"
          className='input-login'
          value={password}
          onChange={handlePasswordChange}
          placeholder="Mật khẩu"
          required
        />
        <input
          type="password"
          className='input-login'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Xác nhận mật khẩu"
          required
        />
        {isError && <Alert variant="danger">{messages}</Alert>}
        <button type="submit" className='button-login' onClick={handleSubmit}>Đăng ký</button>
      </form>
      <div>
        <p className='p-button-login'>
            {'Bạn chưa có tài khoản?'}
            <Link to='/login'>
            {'Đăng Nhập'}
            </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
