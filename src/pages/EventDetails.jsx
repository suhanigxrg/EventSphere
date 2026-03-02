import Navbar from "../components/Navbar";
import "./EventDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import events from "../data/events";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 find correct event
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <div style={{ padding: 40 }}>Event not found</div>;
  }

  const serviceFee = 4.45;
  const [qty, setQty] = useState(1);
  const total = (event.price * qty + serviceFee).toFixed(2);


  const [selectedTicket, setSelectedTicket] = useState(
    event.ticketTypes[0]
  );


  return (
    <>
      <Navbar />

      <div className="event-details-page">
        {/* HERO */}
        <div className="event-hero">
          <img src={event.image} alt={event.title} />

          <div className="event-hero-overlay">
            <p
              className="back-link"
              onClick={() => navigate("/explore")}
            >
              ← Back to Events
            </p>

            <span className="event-tag">{event.category}</span>

            <h1>{event.title}</h1>

            <div className="event-meta">
              <span>📅 {event.date}</span>
              <span>📍 {event.location}</span>
              <span>⭐ {event.rating}</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="event-content">
          {/* LEFT */}
          <div className="event-left">
  {/* ABOUT */}
  <div className="glass-card">
    <h3>About This Event</h3>
    <p className="about-short">{event.description}</p>
    <p className="about-long">{event.longDescription}</p>
  </div>

  {/* EVENT INFO GRID */}
  <div className="glass-card info-grid">
    <h3>Event Information</h3>

    <div className="info-items">
      <div className="info-item">
        <span className="info-label">Date</span>
        <span>{event.date}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Time</span>
        <span>{event.time}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Venue</span>
        <span>{event.venueDetails.name}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Capacity</span>
        <span>{event.venueDetails.capacity}</span>
      </div>

      <div className="info-item">
        <span className="info-label">Attending</span>
        <span>{event.attendees.toLocaleString()}</span>
      </div>
    </div>
  </div>

  {/* ORGANIZER */}
  <div className="glass-card organizer-card">
    <h3>Organizer</h3>

    <div className="organizer-info">
      <div className="organizer-avatar">
        {event.organizer.avatarLetter}
      </div>

      <div>
        <h4>{event.organizer.name}</h4>
        <p>{event.organizer.role}</p>
      </div>
    </div>
  </div>
</div>

          {/* RIGHT BOOKING */}
          <div className="event-right">
            <div className="booking-card">
              <h3>Book Tickets</h3>

              {/* quantity */}
              <div className="quantity-row">
                <button
                  onClick={() =>
                    setQty((q) => Math.max(1, q - 1))
                  }
                >
                  −
                </button>

                <span>{qty}</span>

                <button onClick={() => setQty((q) => q + 1)}>
                  +
                </button>
              </div>

              {/* price breakdown */}
              <div className="price-break">
                <div className="ticket-row">
                  <span>{qty} × General Admission</span>
                  <span>
                    ${(event.price * qty).toFixed(2)}
                  </span>
                </div>

                <div className="ticket-row">
                  <span>Service Fee</span>
                  <span>${serviceFee}</span>
                </div>

                <div className="total-row">
                  <span>Total</span>
                  <span className="price">${total}</span>
                </div>
              </div>

             <button className="primary-btn full"
                onClick={() =>
                    navigate(`/checkout/${event.id}`, {
                    state: {
                        ticket: selectedTicket,
                        qty,
                    },
                    })
                }>
                Book Now
            </button>

              <button className="ghost-btn full">
                Share Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;