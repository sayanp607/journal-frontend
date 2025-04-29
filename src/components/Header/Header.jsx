import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

const Header =({ toggleDarkMode, darkMode })=> {
  const { token, logout } = useContext(AuthContext);
  const location = useLocation();
  
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="header">
      <div className="logo">📝 My Journal App</div>
     
      <nav className="nav">
        {!token ? (
          <>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <>
            <Link
              to={isDashboard ? "/" : "/dashboard"}
              className="nav-link"
            >
              {isDashboard ? "Home" : "Dashboard"}
            </Link>
            <button onClick={logout} className="nav-button">Logout</button>
          </>
        )}
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </nav>
      
    </header>
  );
}

export default Header;
