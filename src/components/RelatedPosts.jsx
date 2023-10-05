import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Audio } from "react-loader-spinner";

const RelatedPosts = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BASE_URL}/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [cat]);

  return (
    <div className="relatedPosts">
      <h3>Related Posts</h3>
      {!posts ? (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      ) : (
        posts.map((item, i) => (
          <div
            key={i}
            className="card"
            style={{ width: "100%", marginBottom: "1rem" }}
          >
            <img
              src={item.img}
              className="card-img-top"
              alt={item.title}
              style={{ width: "100%", height: "10rem" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/posts/${item.id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RelatedPosts;
