import Navbar from "../components/Navbar";
import events from "../data/events";
import EventCard from "../components/EventCard";
import "./Explore.css";
import Skeleton from "../components/Skeleton";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrganizerEvents } from "../utils/storage";

function Explore() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q")?.toLowerCase() || "";

  // ✅ get events created by organizers
  const organizerEvents = getOrganizerEvents() || [];

  // ✅ combine default events + created events
  const allEvents = [...events, ...organizerEvents];

  // ✅ filter events based on search
  const filteredEvents = allEvents.filter((event) =>
    event.title?.toLowerCase().includes(query) ||
    event.category?.toLowerCase().includes(query)
  );

  return (
    <>
      <Navbar />

      <section className="explore-page">
        <div className="container">
          <h1 className="explore-title">Explore Events</h1>

          <div className="explore-layout">
            {/* LEFT FILTERS */}
            <aside className="filters">
              <h3>Filters</h3>

              <div className="filter-group">
                <label>Category</label>
                <select>
                  <option>All</option>
                  <option>Music</option>
                  <option>Technology</option>
                  <option>Sports</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Price</label>
                <select>
                  <option>Any</option>
                  <option>Free</option>
                  <option>Under $100</option>
                  <option>$100+</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Date</label>
                <input type="date" />
              </div>

              <button className="apply-btn">Apply Filters</button>
            </aside>

            {/* RIGHT GRID */}
            <div className="explore-grid">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="event-card">
                      <Skeleton height="180px" radius="14px" />
                      <div style={{ padding: "12px" }}>
                        <Skeleton height="18px" width="70%" />
                        <div style={{ height: 8 }} />
                        <Skeleton height="14px" width="40%" />
                      </div>
                    </div>
                  ))
                : filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;