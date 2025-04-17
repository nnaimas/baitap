import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostLists() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <ul>
      {posts.map(({ slug, title }) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default PostLists;
