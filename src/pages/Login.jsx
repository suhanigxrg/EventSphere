import Navbar from "../components/Navbar";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/storage";

function Login() {
  const navigate = useNavigate();

  // ✅ FORM STATE (MUST BE AT TOP)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  // ✅ HANDLE LOGIN
const handleSubmit = () => {
  if (!form.email || !form.password) {
    setError("Please fill all fields");
    return;
  }

  const user = loginUser(form.email, form.password);

  if (!user) {
    setError("Invalid email or password");
    return;
  }

  navigate("/");
};
  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-wrapper">
          {/* LEFT */}
          <div className="login-left">
            <h1>Welcome Back</h1>
            <p>
              Sign in to manage your bookings and discover amazing events.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="login-card">
            <h2>Log In</h2>

            <form onSubmit={(e) => e.preventDefault()}>
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

              {error && <p className="form-error">{error}</p>}

              <button
                type="button"
                className="primary-btn full"
                onClick={handleSubmit}
              >
                Log In
              </button>
            </form>

            <p className="auth-switch">
              Don’t have an account?
              <span onClick={() => navigate("/signup")}> Sign up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;