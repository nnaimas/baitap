import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetail() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError("Không tìm thấy bài viết");
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>Đang tải...</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p className="post-meta">
        Tác giả: {post.author} - Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
      </p>
      <div className="post-content">{post.content}</div>
      <button onClick={() => navigate("/bai-viet")} className="back-button">
        Quay lại danh sách
      </button>
    </div>
  );
}

export default PostDetail;
