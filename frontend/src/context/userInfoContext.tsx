import { createContext, useState } from 'react';

const UserInfoContext = createContext<any>({})
// {username: '', id: ''}

export function UserInfoContextProvider ({children}) {
  const [userInfo, setUserInfo] = useState({})

  return <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
    {children}
  </UserInfoContext.Provider>
}

export default UserInfoContext