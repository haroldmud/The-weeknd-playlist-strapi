import { createContext, useEffect, useState } from "react";
import { Provider } from "react";

const AuthContext = createContext();

const AuthProvider = ({children})=> {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=> {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token)
  },[])

  return (
    <AuthProvider.Provider value={isAuthenticated}>{children}</AuthProvider.Provider>
  )
}

export { AuthContext, AuthProvider };
