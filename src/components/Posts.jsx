import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

const Posts = ({ img, title, description, id, cat }) => {
  const navigate = useNavigate();

  const getCategory = () => {
    let str = cat;
    switch (str) {
      case "technology":
        str = "Technology";
        break;

      case "fitness":
        str = "Fitness";
        break;

      case "fashion":
        str = "Fashion";
        break;

      case "sports":
        str = "Sports";
        break;

      case "travel":
        str = "Travel";
        break;

      default:
        str = "All";
        break;
    }
    return str;
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
    <div
      className="card"
      style={{
        width: "31.5rem",
        marginBottom: "1rem",
        boxShadow: "1px 1px 5px black"
      }}
    >
      <img
        src={img}
        className="card-img-top"
        alt={title}
        style={{ width: "100%", height: "20rem" }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ textAlign: "center" }}>
          {title}
        </h5>
        <p style={{ textAlign: "center" }} className="card-text">
          {excerpt(getModifiedText(description))}
        </p>

        <div
          className="buttons"
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/posts/${id}`)}
          >
            Read More
          </button>

          <button
            className="btn btn-success"
            onClick={() => navigate(`/?cat=${cat}`)}
          >
            {getCategory()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Posts;
