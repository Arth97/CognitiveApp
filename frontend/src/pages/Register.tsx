
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../api/backApi';
import UserInfoContext from '../context/userInfoContext';


export const Register = (props)  => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const {setUserInfo} = useContext(UserInfoContext)

  const navigate = useNavigate();
  const userApi = new UserApi();

  const handleSubmit = (ev:any) => {
    // Prevents page from reloading losing state
    ev.preventDefault();
    userApi.registerUser({username: username, email: email, password: pass})
    // console.log("username", username)
    // console.log("email", email)
    // console.log("pass", pass)
  }

  const useGuest = () => {
    userApi.getUserId('Invitado')
      .then((userData) => {
        setUserInfo({
          username : userData.username,
          id: userData.id
        })
        navigate('home')
      })
      .catch(() => {
        // Implementar
      })
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username" />

        <label htmlFor="email">Email</label>
        <input disabled value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="user@mail.com" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input disabled value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
      
        <button type="submit">Registrar</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Ya estas registrado? Inicia sesión aqui.</button>
      <button onClick={useGuest} className="main-btn">Iniciar como invitado</button>
    </div>
  )
}