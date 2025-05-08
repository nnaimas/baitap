import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import NewPost from "./components/NewPost";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/dang-nhap" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/dang-nhap" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/bai-viet" element={<PostList />} />
        <Route path="/bai-viet/:id" element={<PostDetail />} />
        <Route 
          path="/tao-bai-viet" 
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/bai-viet" />} />
      </Routes>
    </Router>
  );
}

export default App;
