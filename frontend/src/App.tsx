import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Blogs from "@/pages/Blogs";
import Home from "@/pages/Home";
import SingleBlog from "@/pages/SingleBlog";
import Publish from "@/components/Publish";
import ErrorPage from "@/components/ErrorPage";

function App() {
  const token = localStorage.getItem("medium-jwt-token");
  console.log(token);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
