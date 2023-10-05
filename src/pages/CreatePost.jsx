import axios from "axios";
import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postImg from "../assets/bg.jpg";

axios.defaults.withCredentials = true;

const CreatePost = () => {
  const state = useLocation().state;

  const navigate = useNavigate();
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/drafts/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDraft = async (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please write a title!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });

      return;
    }

    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`${BASE_URL}/api/drafts/${state.id}`, {
            title,
            description: value,
            cat,
            img: file ? imgUrl : state.img
          })
        : await axios.post(`${BASE_URL}/api/drafts/`, {
            title,
            description: value,
            cat,
            img: file ? imgUrl : postImg,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          });
    } catch (err) {
      console.log(err);
      if (err.response.data === "Not authenticated!") {
        toast.error("Please log in to proceed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
        return;
      }
    }

    toast.success("Your draft has been saved!", {
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
    }, 3000);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (title === "" || value === "") {
      toast.error("Please write a title and description!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });

      return;
    }
    const imgUrl = await upload();
    try {
      if (state) {
        if (state.isDraft) {
          await axios.post(`${BASE_URL}/api/posts/`, {
            title,
            description: value,
            cat,
            img: file ? imgUrl : state.img,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          });
          handleDelete(state.id);
        } else {
          await axios.put(`${BASE_URL}/api/posts/${state.id}`, {
            title,
            description: value,
            cat,
            img: file ? imgUrl : state.img
          });
        }
      } else {
        await axios.post(`${BASE_URL}/api/posts/`, {
          title,
          description: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });
      }
    } catch (err) {
      console.log(err);
      if (err.response.data === "Not authenticated!") {
        toast.error("Please log in to proceed!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
        return;
      }
    }

    toast.success("Your post has been published!", {
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
    }, 3000);
  };

  return (
    <div className="createPost">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="editContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            style={{ borderBottom: "none", height: "calc(100% - 3.9rem)" }}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Category</h1>

          <div className="choice">
            <input
              type="radio"
              checked={cat === "travel"}
              name="cat"
              id="travel"
              value="travel"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="travel">Travel</label>
          </div>

          <div className="choice">
            <input
              type="radio"
              checked={cat === "fitness"}
              name="cat"
              id="fitness"
              value="fitness"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="fitness">Fitness</label>
          </div>

          <div className="choice">
            <input
              type="radio"
              checked={cat === "fashion"}
              name="cat"
              id="fashion"
              value="fashion"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="fashion">Fashion</label>
          </div>

          <div className="choice">
            <input
              type="radio"
              checked={cat === "sports"}
              name="cat"
              id="sports"
              value="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sports">Sports</label>
          </div>

          <div className="choice">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              id="technology"
              value="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
        </div>

        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>

          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button onClick={handleDraft}>Save as draft</button>
            <button onClick={handlePublish}>Publish Now</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
