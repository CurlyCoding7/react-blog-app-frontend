import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    const res = await axios.post(`${BASE_URL}/api/auth/logout`);
    setCurrentUser(null);
    toast.success("Successfully logged out!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });

    setTimeout(() => {
      location.reload();
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
