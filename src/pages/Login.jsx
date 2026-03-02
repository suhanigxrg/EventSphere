import Navbar from "../components/Navbar";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <>
      <Navbar />

      <div className="login-page" onMouseMove={(e) => 
        setMouse({x: e.clientX, y: e.clientY,})}
        style={{
          "--mx": mouse.x + "px",
          "--my": mouse.y + "px",
        }}>
          
        <div className="bg-grid"></div>
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-noise"></div>

        <div className="login-wrapper">
          {/* LEFT SIDE */}
          <div className="login-left">
            <h1>Welcome Back</h1>
            <p>
              Sign in to manage your events, bookings, and
              discover amazing experiences.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="login-card">
            <h2>Sign In</h2>

            <form>
              <div className="input-group">
                <input type="email" required />
                <label>Email Address</label>
              </div>

              <div className="input-group">
                <input
                  type={showPass ? "text" : "password"}
                  required
                />
                <label>Password</label>

                <span
                  className="toggle-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁"}
                </span>
              </div>

              <button
                type="button"
                className="primary-btn full"
                onClick={() => navigate("/dashboard")}
              >
                Sign In
              </button>
            </form>

            <p className="auth-switch">
              Don’t have an account?
              <span onClick={() => navigate("/signup")}>
                {" "}
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;