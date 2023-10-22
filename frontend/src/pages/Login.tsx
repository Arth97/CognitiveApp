
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../api/backApi';
import UserInfoContext from '../context/userInfoContext';
import { useUserInfoStore } from '../state/userState';

export const Login = (props)  => {
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  //const {setUserInfo} = useContext(UserInfoContext)

  // Zustand
  const { setUserInfo } = useUserInfoStore();

  const navigate = useNavigate();
  const userApi = new UserApi();

  /* const handleLogout = () => {
    clearUserInfo();
  }; */

  const handleSubmit = (ev:any) => {
    ev.preventDefault(); // Prevents page from reloading losing state
    userApi.getUserId(username)
      .then((userData) => {
        if (username === userData.username) {
          console.log("user guardado es: ", userData.username, userData.id)
          setUserInfo({
            id: userData.id,
            username : userData.username
          })
          navigate('home')
        }
      })
      .catch(() => {
        // Implementar
      })
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
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" id="username" name="username" />

        {/* <label htmlFor="email">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="user@mail.com" id="email" name="email" /> */}

        <label htmlFor="password">Password</label>
        <input disabled value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

        <button type="submit">Iniciar Sesion</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Aun no estas registrado? Registrate aqui.</button>
      <button onClick={useGuest} className="hmain-btn">Iniciar como invitado</button>
    </div>
  )
}