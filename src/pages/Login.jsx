import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/2.jpg";
import { useFormik } from "formik";
import { loginSchema } from "../schemas";

axios.defaults.withCredentials = true;

const initialValues = {
  username: "",
  password: ""
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [error, setError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await handleLogin(values);
      }
    });

  const handleLogin = async (values) => {
    try {
      await login(values);
      toast.success("Successfully logged in!", {
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
        navigate("/");

        location.reload();
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <div className="formContainer">
        <div className="imgContainer">
          <img src={img} alt="" />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>WriteIt</h1>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.username && touched.username ? (
              <p className="form-error">{errors.username}</p>
            ) : null}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
          </div>

          <button type="submit">Login</button>
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "1rem",
                fontSize: "0.9rem"
              }}
            >
              {error}
            </p>
          )}
          <div className="signup-link">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
