import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import bookings from "../data/bookings";
import "./Dashboard.css";
import { getCurrentUser, getUserBookings } from "../utils/storage";
function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const bookings = user ? getUserBookings(user.id) : [];
  return (
    <>
      <Navbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          {/* LEFT SIDEBAR */}
          <div className="dashboard-sidebar">
            <h4 className="sidebar-title">MY ACCOUNT</h4>

            <button className="sidebar-item active">
              🎟 My Bookings
            </button>

            <button className="sidebar-item">
              ⚙ Settings
            </button>

            <button
              className="sidebar-item back"
              onClick={() => navigate("/")}
            >
              ← Back to Site
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div className="dashboard-content">
            <h1>My Bookings</h1>
            <p className="dashboard-sub">
              View and manage your event tickets
            </p>

            <div className="bookings-list">
              {bookings.map((b) => (
                <div key={b.id} className="booking-row">
                  <img src={b.image} alt={b.title} />

                  <div className="booking-info">
                    <h4>{b.title}</h4>
                    <p>
                      {b.date} • {b.tickets} ticket
                    </p>
                  </div>

                  <div className="booking-right">
                    <span className={`status ${b.status}`}>
                      {b.status}
                    </span>

                    <span className="price">${b.price}</span>

                    {/* 👁 eye view */}
                  <button className="eye-btn" 
                      onClick={() => navigate(`/ticket/${b.id}`)}>👁
                  </button> 
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;