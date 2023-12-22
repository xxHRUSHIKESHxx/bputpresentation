import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [authToken, setAuthToken] = useState(
    localStorage.getItem('authToken') || null
  );

  // const [authToken, setAuthToken] = useState(null);

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      inputs
    );

    setCurrentUser(res.data?.user);
    setAuthToken(res.data?.token)
    
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
    setAuthToken(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("authToken", authToken);
  }, [currentUser]);


  // useEffect(() => {
  //   localStorage.setItem("authToken", authToken);
  // }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
