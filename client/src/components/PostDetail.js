import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetail({ isAuthenticated, currentUser }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: "", content: "" });
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/posts/${slug}`);
        setPost(response.data);
        setEditedPost({
          title: response.data.title,
          content: response.data.content
        });
      } catch (err) {
        setError("Không tìm thấy bài viết");
        console.error(err);
      }
    };
    fetchPost();
  }, [slug]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/posts/${slug}`,
        editedPost,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setPost(response.data);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi cập nhật bài viết");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/api/posts/${slug}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate("/bai-viet");
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi xóa bài viết");
      }
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>Đang tải...</div>;

  const canEdit = isAuthenticated && post.author === currentUser;

  return (
    <div className="post-detail">
      {isEditing ? (
        <form onSubmit={handleEdit}>
          <div>
            <label>Tiêu đề:</label>
            <input
              type="text"
              value={editedPost.title}
              onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Nội dung:</label>
            <textarea
              value={editedPost.content}
              onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Lưu</button>
            <button type="button" onClick={() => setIsEditing(false)}>Hủy</button>
          </div>
        </form>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p className="post-meta">
            Tác giả: {post.author} - Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
          </p>
          <div className="post-content">{post.content}</div>
          {canEdit && (
            <div className="button-group">
              <button onClick={() => setIsEditing(true)}>Sửa</button>
              <button onClick={handleDelete} className="delete-button">Xóa</button>
            </div>
          )}
        </>
      )}
      <button onClick={() => navigate("/bai-viet")} className="back-button">
        Quay lại danh sách
      </button>
    </div>
  );
}

export default PostDetail;
