import events from "../data/events";
import EventCard from "./EventCard";
import "./TrendingEvents.css";

function TrendingEvents() {
  return (
    <section className="trending">
      <div className="container">
        <div className="trending-header">
          <div>
            <h2 className="section-title">Trending Events</h2>
            <p className="trending-sub">Don't miss what's hot right now</p>
          </div>

          <span className="view-all">View All →</span>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingEvents;