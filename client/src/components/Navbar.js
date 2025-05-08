import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/dang-nhap");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/bai-viet">Trang chủ</Link>
        {isAuthenticated && (
          <>
            <Link to="/tao-bai-viet">Tạo bài viết mới</Link>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        )}
        {!isAuthenticated && (
          <Link to="/dang-nhap">Đăng nhập</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
