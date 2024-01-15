
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
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="flex-column">
          <label htmlFor="username">Username</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g>
          </svg>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="input" type="text" placeholder="Username" id="username" name="username" />
        </div>

        <div className="flex-column">
          <label htmlFor="username">Email</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g>
          </svg>          
          <input disabled value={username} onChange={(e)=>setUsername(e.target.value)} className="input" type="email" placeholder="user@mail.com" id="email" name="email" />
        </div>

        <div className="flex-column">
          <label htmlFor="password">Password</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input disabled value={pass} onChange={(e)=>setPass(e.target.value)} type="password" className="input" placeholder="********" id="password" name="password" />
        </div>

        <button type="submit" className="button-submit">Sign Up</button>
        <p className="p">
          Ya estas registrado?  <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Inicia sesión aqui.</button>
        </p>

        <div className="flex-row">
          <button type="button" onClick={useGuest} className="btn">Iniciar como invitado</button>
        </div>
      </form>
    </div>
  )
}