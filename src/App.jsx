import ImageGenerator from "./components/ImageGenerator";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Drafts from "./pages/Drafts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import "./styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          <Route
            path="/add"
            element={
              <>
                <Navbar />
                <CreatePost />
              </>
            }
          />

          <Route
            path="/drafts"
            element={
              <>
                <Navbar />
                <Drafts />
              </>
            }
          />

          <Route
            path="/generate-image"
            element={
              <>
                <Navbar />
                <ImageGenerator />
              </>
            }
          />

          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />

          <Route
            path="/posts/:id"
            element={
              <>
                <Navbar />
                <SinglePost />
              </>
            }
          />

          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Register} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
