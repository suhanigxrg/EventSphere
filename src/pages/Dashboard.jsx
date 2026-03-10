import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import events from "../data/events";
import {
  getCurrentUser,
  getUserBookings,
  getOrganizerEvents
} from "../utils/storage";

function Dashboard() {

  const navigate = useNavigate();

  const user = getCurrentUser();

  const bookings = user ? getUserBookings(user.id) : [];

  /* merge all events */
  const organizerEvents = getOrganizerEvents();
  const allEvents = [...events, ...organizerEvents];

  /* helper to get event */
  const getEvent = (eventId) => {
    return allEvents.find((e) => e.id === eventId);
  };

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

              {bookings.length === 0 && (
                <p style={{ marginTop: 20 }}>No bookings yet.</p>
              )}


              {bookings.map((b) => {

                const event = getEvent(b.eventId);

                if (!event) return null;

                return (
                  <div key={b.id} className="booking-row">

                    <img
                      src={event.image}
                      alt={event.title}
                    />

                    <div className="booking-info">

                      <h4>{event.title}</h4>

                      <p>
                        {event.date} • {b.tickets} ticket
                      </p>

                    </div>


                    <div className="booking-right">

                      <span className={`status ${b.status}`}>
                        {b.status}
                      </span>

                      <span className="price">
                        ${b.amount}
                      </span>


                      {/* 👁 view ticket */}
                      <button
                        className="eye-btn"
                        onClick={() =>
                          navigate(`/ticket-success/${b.eventId}`)
                        }
                      >
                        👁
                      </button>

                    </div>

                  </div>
                );

              })}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;