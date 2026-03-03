import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/eventspherelogo.png";
import { getCurrentUser, logoutUser } from "../utils/storage";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  useEffect(() => {
    const syncUser = () => {
      setUser(getCurrentUser());
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, [location.pathname]);


  return (
    <header className="glass-nav">
      <div className="container nav-inner">
        {/* LEFT LOGO */}
        <div className="logo-wrap" onClick={() => navigate("/")}>
          <img src={logo} alt="EventSphere" />
          <span className="logo-text">EventSphere</span>
        </div>

        {/* CENTER LINKS */}
        <nav className={`nav-center ${open ? "open" : ""}`}>
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

          {!user ? (
            <>
              <Link to="/login" className="login-link">
                Log In
              </Link>

              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="avatar-wrap">
              <div
                className="avatar"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="user" />
                ) : (
                  user.name?.charAt(0).toUpperCase()
                )}
              </div>

              {/* 🔥 PROFILE PANEL */}
              <div className={`profile-panel ${profileOpen ? "open" : ""}`}>
                <div className="profile-head">
                  <div className="avatar large">
                    {user.avatar ? (
                      <img src={user.avatar} alt="user" />
                    ) : (
                      user.name?.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <span className="role-badge">{user.role}</span>
                  </div>
                </div>

                <button className="ghost-btn full">
                  Edit Profile
                </button>

                <button
                  className="logout-btn"
                  onClick={() => {
                    logoutUser();
                    setUser(null);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <div className="nav-toggle" onClick={() => setOpen(!open)}>
            ☰
          </div>
      </div>
      </div>
    </header>
  );
}

export default Navbar;