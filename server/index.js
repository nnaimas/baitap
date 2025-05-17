require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const app = express();
const PORT = 4000;
const JWT_SECRET = process.env.JWT_SECRET;

// Thêm log để kiểm tra kết nối
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Đã kết nối với MongoDB thành công'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

app.use(cors());
app.use(express.json());

// Mock database với mật khẩu thường
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123"
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

// API đăng nhập
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(400).json({ message: "Không tìm thấy người dùng" });
  }

  if (password !== user.password) {
    return res.status(400).json({ message: "Mật khẩu không đúng" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
  res.json({ token });
});

// API lấy danh sách bài viết
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bài viết" });
  }
});

// API lấy chi tiết bài viết theo slug
app.get("/api/posts/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết bài viết" });
  }
});

// API tạo bài viết mới
app.post("/api/posts", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Tạo slug từ title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost = new Post({
      title,
      content,
      author: req.user.username,
      slug
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error
      res.status(400).json({ message: "Tiêu đề bài viết đã tồn tại" });
    } else {
      res.status(500).json({ message: "Lỗi khi tạo bài viết" });
    }
  }
});

// API cập nhật bài viết
app.put("/api/posts/:slug", authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    // Kiểm tra quyền sửa bài viết
    if (post.author !== req.user.username) {
      return res.status(403).json({ message: "Không có quyền sửa bài viết này" });
    }

    // Tạo slug mới nếu title thay đổi
    if (title !== post.title) {
      const newSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Kiểm tra slug mới có bị trùng không
      const existingPost = await Post.findOne({ slug: newSlug });
      if (existingPost) {
        return res.status(400).json({ message: "Tiêu đề bài viết đã tồn tại" });
      }
      post.slug = newSlug;
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật bài viết" });
  }
});

// API xóa bài viết
app.delete("/api/posts/:slug", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    // Kiểm tra quyền xóa bài viết
    if (post.author !== req.user.username) {
      return res.status(403).json({ message: "Không có quyền xóa bài viết này" });
    }

    await post.deleteOne();
    res.json({ message: "Đã xóa bài viết thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa bài viết" });
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});