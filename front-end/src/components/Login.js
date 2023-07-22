import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import {Link , useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState("");
  const [isError, setIsError] = useState(false);
  // const dataset = {}

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
        setErrorMessage('Vui lòng điền đầy đủ thông tin');
        setMessages("Vui lòng điền đầy đủ thông tin")
        setIsError(true)
        return;
    }
    if (username.includes(' ') || password.includes(' ')) {
        setIsError(true)
        setMessages("Tên người dùng và mật khẩu không được chứa khoảng trắng!")
        setErrorMessage('Tên người dùng và mật khẩu không được chứa khoảng trắng');
        return;
    }
    try{
      const resp = await fetch(`http://localhost:8080/users/${username}`)
      const data = await resp.json()
      console.log(data)
      if( !data ) {
        setIsError(true)
        setMessages("Tài khoản không tồn tại!")
        console.log("tài khoản không tồn tại!")
        return;
      }
      if( data.password !== password ){
          setIsError(true)
          setMessages("Thông tin mật khẩu không chính xác!")
          console.log("Sai mật khẩu")
          return;
      }
      if( data.position){
        localStorage.setItem("role","admin")
      }
      else{
        localStorage.setItem("role","user")
      }
    } catch(err){
      setIsError(true)
      setMessages("Tài khoản không tồn tại!")
      return
    }
    localStorage.setItem("checklogin","true")
    navigate('/');
    setIsError(false)
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit} className='form-login'>
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
        {isError && <Alert variant="danger">{messages}</Alert>}
        <button type="submit" className='button-login'>Đăng nhập</button>
      </form>
      <div>
        <p className='p-button-login'>
            {'Bạn chưa có tài khoản?'}
            <Link to='/register' className='button'>
            {'Đăng ký'}
            </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
