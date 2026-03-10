import Navbar from "../components/Navbar";
import "./TicketSuccess.css";
import { useParams, useNavigate } from "react-router-dom";
import events from "../data/events";
import {
  getOrganizerEvents,
  getBookings
} from "../utils/storage";
import { QRCodeCanvas } from "qrcode.react";

function TicketSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 merge events
  const organizerEvents = getOrganizerEvents();
  const allEvents = [...events, ...organizerEvents];

  // 🔥 find event
  const event = allEvents.find((e) => e.id.toString() === id);

  if (!event) {
    return <div style={{ padding: 40 }}>Event not found</div>;
  }

  // 🔥 find latest booking for this event
  const bookings = getBookings();
  const booking = bookings
    .filter((b) => b.eventId.toString() === id)
    .sort((a, b) => b.id - a.id)[0];

  if (!booking) {
    return <div style={{ padding: 40 }}>Ticket not found</div>;
  }

  const ticketCode = `EVENT:${event.id}-BOOKING:${booking.id}-USER:${booking.userId}`;

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

          <div className="success-icon">✓</div>

          <h1>Booking Confirmed!</h1>
          <p className="success-sub">
            Your ticket has been sent to your email
          </p>

          {/* 🎟 Ticket Card */}
          <div className="ticket-card">
            <img
              src={event.image}
              alt={event.title}
              className="ticket-img"
            />

            <div className="ticket-info">
              <h3>{event.title}</h3>

              <p>📅 {event.date}</p>

              <p>📍 {event.location || event.venue}</p>

              <div className="ticket-id">
                <span>Ticket ID</span>

                <strong>
                  ES-{booking.id.toString().slice(-6)}
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

          {/* Buttons */}
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