import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import Signup from "@/pages/Signup"
import Signin from "@/pages/Signin"
import Blog from "@/pages/Blog"


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
