import Navbar from "../components/Navbar";
import "./TicketSuccess.css";
import { useParams, useNavigate } from "react-router-dom";
import events from "../data/events";
import bookings from "../data/bookings";
import { QRCodeCanvas } from "qrcode.react";

function TicketSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* 🔥 find booking first */
  const booking = bookings.find((b) => b.id === Number(id));

  /* safety early */
  if (!booking) {
    return <div style={{ padding: 40 }}>Ticket not found</div>;
  }

  /* 🔥 then find its event */
  const event = events.find((e) => e.id === booking.id);

  if (!event) {
    return <div style={{ padding: 40 }}>Event not found</div>;
  }

  const ticketCode = `EVENT:${event.id}-BOOKING:${booking.id}-USER:ES`;

  return (
    <>
      <Navbar />

      <div
        className="ticket-success-page"
        style={{
          "--success-bg": `url(${event.image})`,
        }}
      >
        <div className="success-wrapper">
          {/* success icon */}
          <div className="success-icon">✓</div>

          <h1>Booking Confirmed!</h1>
          <p className="success-sub">
            Your ticket has been sent to your email
          </p>

          {/* 🎟 ticket card */}
          <div className="ticket-card">
            <img
              src={event.image}
              alt={event.title}
              className="ticket-img"
            />

            <div className="ticket-info">
              <h3>{event.title}</h3>
              <p>📅 {event.date}</p>
              <p>📍 {event.location}</p>

              <div className="ticket-id">
                <span>Ticket ID</span>
                <strong>
                  ES-
                  {Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toUpperCase()}
                </strong>
              </div>
            </div>

            {/* QR */}
            <div className="qr-box">
              <QRCodeCanvas
                value={ticketCode}
                size={90}
                bgColor="transparent"
                fgColor="#ffffff"
              />
            </div>
          </div>

          {/* ✅ buttons OUTSIDE ticket-card */}
          <div className="success-actions">
            <button
              className="ghost-btn"
              onClick={() => navigate("/dashboard")}
            >
              My Bookings
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/explore")}
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketSuccess;