import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { AiFillDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Drafts = () => {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BASE_URL}/api/drafts/`);
        setDrafts(res.data);
      } catch (err) {
        console.log(err);
        if (err.response.data === "Not authenticated!") {
          navigate("/");
        }
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/drafts/${id}`);

      toast.success("Your draft has been deleted!", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const getModifiedText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const excerpt = (string) => {
    if (string.length > 50) {
      string = string.substring(0, 50) + "...";
    }
    return string;
  };

  return (
    <div className="drafts">
      {drafts.map((item, index) => (
        <div
          key={index}
          className="card"
          style={{ width: "28rem", marginBottom: "1rem" }}
        >
          <img
            src={`../public/uploads/${item.img}`}
            className="card-img-top"
            alt={item.title}
            style={{ width: "100%", height: "20rem" }}
          />
          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: "center" }}>
              {item.title}
            </h5>
            <p style={{ textAlign: "center" }} className="card-text">
              {excerpt(getModifiedText(item.description))}
            </p>

            <div
              className="buttons"
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Link to="/add/?edit" state={{ ...item, isDraft: true }}>
                <FaPen
                  style={{
                    color: "blue",
                    fontSize: "1.1rem",
                    cursor: "pointer"
                  }}
                />
              </Link>

              {currentUser?.id === item.uid && (
                <AiFillDelete
                  onClick={() => handleDelete(item.id)}
                  style={{
                    color: "red",
                    fontSize: "1.2rem",
                    cursor: "pointer"
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Drafts;
