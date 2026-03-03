import Navbar from "../components/Navbar";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/storage";

function Signup() {
  const navigate = useNavigate();

  // ✅ safe mouse tracking
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

const handleSubmit = () => {
  if (!form.name || !form.email || !form.password) {
    setError("Please fill all fields");
    return;
  }

  if (form.password !== form.confirm) {
    setError("Passwords do not match");
    return;
  }

  // ✅ save user
  saveUser({
    name: form.name,
    email: form.email,
    password: form.password,
    gender: "",
    avatar: "",
  });

  // ✅ auto login after signup
  loginUser(form.email, form.password);

  // ✅ go to home (NOT dashboard)
  navigate("/");
};


  return (
    <>
      <Navbar />

      <div
        className="signup-page"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        style={{
          "--mx": mouse.x + "px",
          "--my": mouse.y + "px",
        }}
      >
        {/* 🌌 BACKGROUND LAYERS */}
        <div className="bg-grid"></div>
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-noise"></div>

        <div className="signup-wrapper">
          {/* LEFT */}
          <div className="signup-left">
            <h1>Create Account</h1>
            <p>
              Join EventSphere to discover events, manage bookings,
              and host amazing experiences.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="signup-card">
            <h2>Sign Up</h2>

            <form>
              {/* NAME */}
              <div className="input-group">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label>Full Name</label>
              </div>

              {/* EMAIL */}
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label>Email Address</label>
              </div>

              {/* PASSWORD */}
              <div className="input-group">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
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

              {/* CONFIRM PASSWORD */}
              <div className="input-group">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
                <label>Confirm Password</label>

                <span
                  className="toggle-pass"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? "🙈" : "👁"}
                </span>
              </div>

              {/* ERROR */}
              {error && <p className="form-error">{error}</p>}

              {/* BUTTON */}
              <button
                type="button"
                className="primary-btn full"
                onClick={handleSubmit}
              >
                Create Account
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?
              <span onClick={() => navigate("/login")}>
                {" "}
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;