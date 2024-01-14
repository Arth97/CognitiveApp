
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserApi } from '../api/backApi';
// import UserInfoContext from '../context/userInfoContext';
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
      <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {/* </form> */}
        <div className="flex-column">
          <label htmlFor="username">Username</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
            {/* SVG Path for Email Icon */}
          </svg>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="input" type="text" placeholder="Username" id="username" name="username" />
        </div>

        <div className="flex-column">
          <label htmlFor="password">Password</label>
        </div>
        <div className="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
            {/* SVG Path for Password Icon */}
          </svg>
          <input disabled value={pass} onChange={(e)=>setPass(e.target.value)} type="password" className="input" placeholder="********" id="password" name="password" />
          <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            {/* SVG Path for Show Password Icon */}
          </svg>
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <button type="submit" className="button-submit">Sign In</button>
        <p className="p">
          Aun no estas registrado? <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Registrate aqui.</button>
        </p>

        <div className="flex-row">
          <button onClick={useGuest} className="hmain-btn btn">Iniciar como invitado</button>
        </div>
      </form>
    </div>
  );
}