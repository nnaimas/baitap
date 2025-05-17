import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/posts");
        setPosts(response.data);
      } catch (err) {
        setError("Lỗi khi tải danh sách bài viết");
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  // Hàm lọc bài viết theo thời gian
  const filterByTime = (post) => {
    const postDate = new Date(post.createdAt);
    const now = new Date();
    
    switch (timeFilter) {
      case "today":
        return postDate.toDateString() === now.toDateString();
      case "week":
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return postDate >= weekAgo;
      case "month":
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return postDate >= monthAgo;
      default:
        return true;
    }
  };

  // Lọc bài viết theo tìm kiếm và thời gian
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTime = filterByTime(post);
    return matchesSearch && matchesTime;
  });

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="post-list">
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="time-filter">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">Tất cả thời gian</option>
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
          </select>
        </div>
      </div>

      <h2>Danh Sách Bài Viết</h2>
      {filteredPosts.length === 0 ? (
        <p className="no-results">Không tìm thấy bài viết nào</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} className="post-preview">
            <Link to={`/bai-viet/${post.id}`}>
              <h3>{post.title}</h3>
            </Link>
            <p>Tác giả: {post.author} - Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
