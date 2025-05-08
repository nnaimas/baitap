const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8080;
const JWT_SECRET = "your-secret-key"; // Trong môi trường thực tế, nên dùng biến môi trường

app.use(cors());
app.use(express.json());

// Mock database với mật khẩu thường
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123" // Mật khẩu thường, không mã hóa
  }
];

const blogPosts = [
  {
    id: 1,
    title: "Giới thiệu về React Router",
    content: "Bài viết này giải thích về cơ bản của React Router.",
    author: "admin",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Hướng dẫn sử dụng React Hooks",
    content: "Tìm hiểu về React Hooks và cách sử dụng chúng trong ứng dụng React.",
    author: "admin",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 ngày trước
  },
  {
    id: 3,
    title: "State Management trong React",
    content: "Các phương pháp quản lý state trong ứng dụng React.",
    author: "admin",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 tuần trước
  },
  {
    id: 4,
    title: "Tối ưu hiệu suất React",
    content: "Các kỹ thuật tối ưu hiệu suất cho ứng dụng React.",
    author: "admin",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 1 tháng trước
  }
];

// Middleware xác thực
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: "Không có quyền truy cập" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token không hợp lệ" });
    req.user = user;
    next();
  });
};

// API đăng nhập - sửa lại để so sánh mật khẩu thường
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(400).json({ message: "Không tìm thấy người dùng" });
  }

  // So sánh mật khẩu thường
  if (password !== user.password) {
    return res.status(400).json({ message: "Mật khẩu không đúng" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token });
});

// API lấy danh sách bài viết
app.get("/api/posts", (req, res) => {
  const posts = blogPosts.map(({ id, title, author, createdAt }) => ({
    id,
    title,
    author,
    createdAt
  }));
  res.json(posts);
});

// API lấy chi tiết bài viết
app.get("/api/posts/:id", (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: "Không tìm thấy bài viết" });
  }
  res.json(post);
});

// API tạo bài viết mới (yêu cầu đăng nhập)
app.post("/api/posts", authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
    author: req.user.username,
    createdAt: new Date().toISOString()
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});