import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h2>Categories</h2>

      <Link className="cat" to="/?cat=travel">
        Travel
      </Link>

      <Link className="cat" to="/?cat=fitness">
        Fitness
      </Link>

      <Link className="cat" to="/?cat=fashion">
        Fashion
      </Link>

      <Link className="cat" to="/?cat=sports">
        Sports
      </Link>

      <Link className="cat" to="/?cat=technology">
        Technology
      </Link>

      <Link className="cat" to="/">
        All
      </Link>
    </div>
  );
};

export default Categories;
