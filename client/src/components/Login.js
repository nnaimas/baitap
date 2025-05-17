import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/login", credentials);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/bai-viet");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
}

export default Login;
