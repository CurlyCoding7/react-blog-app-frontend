import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Posts from "../components/Posts";
import Categories from "../components/Categories";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { BsRobot } from "react-icons/bs";
import Chatbot from "../components/Chatbot";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const cat = useLocation().search;
  const [isBoatVisible, setIsBoatVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BASE_URL}/api/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [cat]);

  const handleBoatVisibility = () => {
    isBoatVisible ? setIsBoatVisible(false) : setIsBoatVisible(true);
  };

  return (
    <div className="home">
      <div className="search">
        <FaSearch style={{ color: "white" }} />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="feed">
        <div className="posts">
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
            posts
              .filter((post) => {
                if (query === "") {
                  return post;
                } else if (
                  post.title
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase()) ||
                  post.description
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase())
                ) {
                  return post;
                }
              })
              .map((item, index) => (
                <Posts
                  key={index}
                  id={item.id}
                  img={item.img}
                  title={item.title}
                  description={item.description}
                  cat={item.cat}
                />
              ))
          )}
        </div>

        <Categories />
        <Chatbot isBoatVisible={isBoatVisible} />
        <div
          className="chatboat"
          style={{
            position: "fixed",
            bottom: "5px",
            right: "5px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "0.1rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem"
          }}
          onClick={handleBoatVisibility}
        >
          <BsRobot
            style={{
              fontSize: "1.8rem"
            }}
          />
          <span style={{ fontSize: "0.8rem" }}>Any query?</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
