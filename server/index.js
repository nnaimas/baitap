const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

const blogPosts = {
  "post-1": {
    title: "Understanding React Router",
    description: "This post explains the basics of React Router.",
  },
  "post-2": {
    title: "Nested Routes in React",
    description: "Learn how to use nested routing in your apps.",
  },
  "post-3": {
    title: "Outlet Component Explained",
    description: "Understand how Outlet works in nested routing.",
  },
};

app.get("/api/posts", (req, res) => {
  const list = Object.entries(blogPosts).map(([slug, { title }]) => ({
    slug,
    title,
  }));
  res.json(list);
});

app.get("/api/posts/:slug", (req, res) => {
  const post = blogPosts[req.params.slug];
  if (post) {
    res.json({ slug: req.params.slug, ...post });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
