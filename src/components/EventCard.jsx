import { useNavigate } from "react-router-dom";
import "./EventCard.css";

function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      className="event-card"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <span className="event-badge">{event.category}</span>
      </div>

      <div className="event-info">
        <h3>{event.title}</h3>
        <p className="event-date">{event.date}</p>
        <p className="event-location">{event.location}</p>

        <div className="event-bottom">
          <span className="price">${event.price}</span>
          <span className="rating">⭐ {event.rating}</span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;