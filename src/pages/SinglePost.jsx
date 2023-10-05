import React, { useContext, useEffect, useState } from "react";
import RelatedPosts from "../components/RelatedPosts";
import { AiFillDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImg from "../assets/user.webp";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SinglePost = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  const getModifiedText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/posts/${postId}`);

      toast.success("Your post has been deleted!", {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BASE_URL}/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [postId]);

  return (
    <div className="singlePost">
      <div className="content">
        <img src={post?.img} alt={post?.title} />
        <div className="icons">
          <img src={post?.userimg ? post?.userimg : userImg} />
          <span>{post?.username}</span>
          {currentUser?.username === post.username && (
            <div>
              <AiFillDelete
                onClick={handleDelete}
                style={{ color: "red", fontSize: "1.2rem" }}
              />
              <Link to="/add/?edit" state={post}>
                <FaPen style={{ color: "blue", fontSize: "1.1rem" }} />
              </Link>
            </div>
          )}
        </div>
        <span className="title">{post?.title}</span>
        <p>{getModifiedText(post?.description)}</p>
      </div>
      <RelatedPosts cat={post?.cat} />
    </div>
  );
};

export default SinglePost;
