import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!token;
  const isAdmin = user?.Role === "admin";
  const isUser = user?.Role === "user";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <header className="header">
      <img src="/logo2.png" alt="Logo"></img>
      <div className="links">
        {!isAdmin && <NavLink to={"/"}>Home</NavLink>}
        {isUser && <NavLink to={"/my-questions"}>My Questions</NavLink>}
        {isAdmin && <NavLink to={"/admin-home"}>Admin Home</NavLink>}
        {isAdmin && <NavLink to={"/admin-reports"}>Reports</NavLink>}
        <NavLink to={"/about"}>About</NavLink>
        {!isLoggedIn && (
          <div>
            <NavLink to={"/login"}>Login</NavLink>/
            <NavLink to={"/register"}>Register</NavLink>
          </div>
        )}
        {isLoggedIn && <NavLink to={"/profile"}>Profile</NavLink>}
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
