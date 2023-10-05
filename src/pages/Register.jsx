import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/2.jpg";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: ""
};

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [error, setError] = useState(null);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        await handleSignUp(values);
      }
    });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      const res = await axios.post(`${BASE_URL}/api/upload`, formData, config);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async (values) => {
    const imgUrl = file ? await upload() : "";
    const newInputs = { ...values, img: imgUrl };

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, newInputs);
      toast.success("Successfully signed up. Please log in now!", {
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
        navigate("/login");
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
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
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

          <div>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}
          </div>

          <div className="fileWrapper">
            <input
              className="fileInput"
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit">Sign up</button>
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
            <span>Already have an account?</span>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
