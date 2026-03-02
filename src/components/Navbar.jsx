import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <header className="glass-nav">
      <div className="container nav-inner">
        {/* LEFT LOGO */}
        <div className="logo-wrap">
          <div className="logo-circle">E</div>
          <span className="logo-text">EventSphere</span>
        </div>

        {/* CENTER LINKS */}
        <nav className="nav-center">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">
            Home
          </Link>
          <Link
            className={location.pathname === "/explore" ? "active" : ""}
            to="/explore"
          >
            Explore
          </Link>
          <Link
            className={location.pathname === "/dashboard" ? "active" : ""}
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link to="/organizer">Organizer</Link>
          
        </nav>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          <span className="search-icon">🔍</span>

          <Link to="/login" className="login-link">
            Log In
          </Link>

          <Link to="/signup" className="signup-btn">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;