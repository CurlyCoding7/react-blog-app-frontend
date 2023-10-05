import React, { useContext } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDraftLine } from "react-icons/ri";
import { BsImage } from "react-icons/bs";
import userImg from "../assets/user.webp";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleDraft = () => {
    if (!currentUser) {
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
        navigate("/login");
      }, 3000);
    }
    navigate("/drafts");
  };

  const handleWrite = () => {
    navigate("/add");
  };

  return (
    <nav
      className="navbar fixed-top"
      style={{
        boxShadow: "0px 0px 3px gray",
        backgroundColor: "white"
      }}
    >
      <div className="container-fluid">
        <Link
          style={{ fontSize: "1.9rem", color: "black", fontWeight: "bold" }}
          className="navbar-brand"
          to={"/"}
        >
          WriteIt
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              WriteIt
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ backgroundColor: "white" }}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <img
                  src={currentUser ? currentUser?.img : userImg}
                  alt="User"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%"
                  }}
                />
              </li>

              <li className="nav-item">
                <span>{currentUser?.username}</span>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to={"/"}>
                  <span style={{ fontSize: "1.1rem", color: "white" }}>
                    Home
                  </span>
                  <AiOutlineHome
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      marginLeft: "0.2rem"
                    }}
                  />
                </Link>
              </li>
              <li className="nav-item active" aria-current="page">
                <div
                  className="nav-link"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={handleWrite}
                >
                  <span style={{ fontSize: "1.1rem" }}>Write</span>
                  <BsPencilSquare
                    style={{ fontSize: "1.5rem", marginLeft: "0.2rem" }}
                  />
                </div>
              </li>
              <li className="nav-item active" aria-current="page">
                <div
                  className="nav-link"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={handleDraft}
                >
                  <span style={{ fontSize: "1.1rem" }}>Drafts</span>
                  <RiDraftLine
                    style={{ fontSize: "1.5rem", marginLeft: "0.2rem" }}
                  />
                </div>
              </li>

              <li className="nav-item">
                <div
                  className="nav-link"
                  style={{ cursor: "pointer", color: "white" }}
                  onClick={() => navigate("/generate-image")}
                >
                  <span style={{ fontSize: "1.1rem" }}>Generate Image</span>
                  <BsImage
                    style={{ fontSize: "1.5rem", marginLeft: "0.2rem" }}
                  />
                </div>
              </li>

              <li className="nav-item active" aria-current="page">
                <Link className="nav-link" to={"/about"}>
                  <span style={{ fontSize: "1.1rem", color: "white" }}>
                    About
                  </span>
                  <BiDetail
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      marginLeft: "0.2rem"
                    }}
                  />
                </Link>
              </li>
            </ul>
            <div
              className="buttons"
              style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}
            >
              {currentUser ? (
                <button
                  style={{ border: "1px solid white", color: "white" }}
                  className="btn"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    style={{ border: "1px solid white", color: "white" }}
                    className="btn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    style={{ border: "1px solid white", color: "white" }}
                    className="btn"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
