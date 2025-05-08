import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NewPost() {
  const [post, setPost] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để tạo bài viết");
        return;
      }

      await axios.post("http://localhost:8080/api/posts", post, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/bai-viet");
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi tạo bài viết");
      console.error(err);
    }
  };

  return (
    <div className="new-post-container">
      <h2>Tạo Bài Viết Mới</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Nội dung:</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
          />
        </div>
        <button type="submit">Đăng Bài</button>
      </form>
    </div>
  );
}

export default NewPost;
