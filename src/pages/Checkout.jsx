import Navbar from "../components/Navbar";
import "./Checkout.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import events from "../data/events";
import {
  addBooking,
  getCurrentUser,
  getOrganizerEvents
} from "../utils/storage";
import { useEffect } from "react";

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 merge static + organizer events
  const organizerEvents = getOrganizerEvents();
  const allEvents = [...events, ...organizerEvents];

  // 🔥 find event using id
  const event = allEvents.find((e) => e.id.toString() === id);

  // 🔥 get ticket + qty from navigation state
  let ticket = location.state?.ticket;
  let qty = location.state?.qty || 1;

  // 🔥 fallback if page refresh happens
  if (!ticket && event) {
    ticket =
      event.ticketTypes?.[0] || {
        name: "General Admission",
        price: event.price,
      };
  }

  const serviceFee = 4.45;

  if (!event) {
    return <div style={{ padding: 40 }}>Invalid checkout</div>;
  }

  const subtotal = ticket.price * qty;
  const total = (subtotal + serviceFee).toFixed(2);

  const user = getCurrentUser();

  // 🔐 redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 💳 purchase handler
  const handlePurchase = () => {
    const user = getCurrentUser();

    if (!user) {
      navigate("/login");
      return;
    }

    addBooking({
      id: Date.now(),
      userId: user.id,
      eventId: event.id,
      tickets: qty,
      amount: Number(total),
      status: "confirmed",
    });

    navigate(`/ticket-success/${event.id}`);
  };

  return (
    <>
      <Navbar />

      <div
        className="checkout-page"
        style={{
          "--checkout-bg": `url(${event.image})`,
        }}
      >
        <div className="checkout-wrapper">
          {/* LEFT SIDE */}
          <div className="checkout-left">
            <p className="back-link" onClick={() => navigate(-1)}>
              ← Back to Event
            </p>

            <h1 className="checkout-title">Checkout</h1>

            {/* CONTACT */}
            <div className="glass-card checkout-card">
              <h3>Contact Information</h3>

              <div className="input-row">
                <input placeholder="First Name" />
                <input placeholder="Last Name" />
              </div>

              <input placeholder="Email" />
              <input placeholder="Phone" />
            </div>

            {/* PAYMENT */}
            <div className="glass-card checkout-card">
              <h3>Payment Details</h3>

              <input placeholder="Card Number" />

              <div className="input-row">
                <input placeholder="MM / YY" />
                <input placeholder="CVC" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="checkout-right">
            <div className="summary-card sticky">
              <h3>Order Summary</h3>

              <div className="summary-event">
                <img src={event.image} alt="" />

                <div>
                  <h4>{event.title}</h4>
                  <p>{event.date}</p>
                </div>
              </div>

              <div className="summary-line">
                <span>
                  {qty} × {ticket.name}
                </span>

                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-line">
                <span>Service Fee</span>
                <span>${serviceFee}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <button className="primary-btn full" onClick={handlePurchase}>
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;