import Navbar from "../components/Navbar";
import "./Organizer.css";
import { useNavigate } from "react-router-dom";
import { getOrganizerEvents, getBookings } from "../utils/storage";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";


function Organizer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [eventsList, setEventsList] = useState([]);
const [bookingsList, setBookingsList] = useState([]);


  // ================= METRICS =================

    const totalRevenue = bookingsList.reduce(
    (sum, b) => sum + b.amount,
    0
  );
  const ticketsSold = bookingsList.reduce(
    (sum, b) => sum + b.tickets,
    0
  );



  const totalEvents = eventsList.length;

  const activeEvents = eventsList.filter(
    (e) => e.status === "published"
  ).length;

  // 🔥 group bookings by event
  const bookingsByEvent = eventsList.map((event) => ({
    ...event,
    bookings: bookingsList.filter(
      (b) => b.eventId === event.id
    ),
  }));


useEffect(() => {
  setEventsList(getOrganizerEvents());
  setBookingsList(getBookings());
}, []);

  // ================= CHART DATA =================

// revenue per event
const revenueData = eventsList.map((e) => ({
  name: e.title.slice(0, 8),
  revenue: e.revenue || 0,
  tickets: e.sold || 0,
}));

// monthly realistic trend
const monthlyData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 2100 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 3200 },
  { month: "May", revenue: 2800 },
  { month: "Jun", revenue: 3900 },
];

// category distribution
const categoryMap = {};
eventsList.forEach((e) => {
  categoryMap[e.category] = (categoryMap[e.category] || 0) + 1;
});

const pieData = Object.keys(categoryMap).map((key) => ({
  name: key,
  value: categoryMap[key],
}));

const PIE_COLORS = ["#7c3aed", "#3b82f6", "#ec4899", "#22c55e"];

  return (
    <>
      <Navbar />

      <div className="org-page">
        <div className="org-container">

          {/* ================= SIDEBAR ================= */}
          <div className="org-sidebar">
            <h4 className="org-side-title">ORGANIZER</h4>

            <button
              className={`org-side-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </button>

            <button
              className={`org-side-item ${activeTab === "bookings" ? "active" : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              🎟 Bookings
            </button>

            <button
              className={`org-side-item ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              📈 Analytics
            </button>

            <button
              className="org-side-item"
              onClick={() => navigate("/organizer/create")}
            >
              ➕ Create Event
            </button>

            <button
              className="org-side-item back"
              onClick={() => navigate("/")}
            >
              ← Back to Site
            </button>
          </div>

          {/* ================= MAIN ================= */}
          <div className="org-main">

            {/* ================================================= */}
            {/* ================= DASHBOARD ===================== */}
            {/* ================================================= */}
            {activeTab === "dashboard" && (
              <>
                <h1>Organizer Dashboard</h1>
                <p className="org-sub">
                  Manage your events and track performance
                </p>

                {/* ===== STATS ===== */}
                <div className="org-stats">
                  <div className="stat-card">
                    <h4>Total Revenue</h4>
                    <h2>${totalRevenue.toLocaleString()}</h2>
                  </div>

                  <div className="stat-card">
                    <h4>Tickets Sold</h4>
                    <h2>{ticketsSold.toLocaleString()}</h2>
                  </div>

                  <div className="stat-card">
                    <h4>Total Events</h4>
                    <h2>{totalEvents}</h2>
                  </div>

                  <div className="stat-card">
                    <h4>Active Events</h4>
                    <h2>{activeEvents}</h2>
                  </div>
                </div>

                {/* ===== MY EVENTS TABLE ===== */}
                <div className="events-table">
                  <div className="table-head">
                    <h3>My Events</h3>

                    <button
                      className="primary-btn"
                      onClick={() => navigate("/organizer/create")}
                    >
                      + Create Event
                    </button>
                  </div>

                  <div className="table-body">
                    {eventsList.map((event) => (
                      <div key={event.id} className="event-row">
                        <img src={event.image} alt={event.title} />

                        <div className="event-info">
                          <h4>{event.title}</h4>
                          <p>
                            {event.date} • {event.venue}
                          </p>
                        </div>

                        <div className="event-stats">
                          <span>{event.sold || 0} sold</span>
                          <span className="rev">
                            ${(event.revenue || 0).toLocaleString()}
                          </span>
                        </div>

                        <span className={`status ${event.status}`}>
                          {event.status}
                        </span>

                        <button
                          className="ghost-btn small"
                          onClick={() =>
                            navigate(`/organizer/create?edit=${event.id}`)
                          }
                        >
                          Manage
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ================================================= */}
            {/* ================= BOOKINGS ====================== */}
            {/* ================================================= */}
            {activeTab === "bookings" && (
              <>
                <h1>Event Bookings</h1>
                <p className="org-sub">
                  View bookings grouped by event
                </p>

                {bookingsByEvent.map((event) => (
                  <div key={event.id} className="booking-group glass-card">
                    <div className="booking-group-head">
                      <h3>{event.title}</h3>
                      <span>{event.bookings.length} bookings</span>
                    </div>

                    {event.bookings.length === 0 ? (
                      <p className="empty-text">No bookings yet</p>
                    ) : (
                      <table className="org-table">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>Tickets</th>
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {event.bookings.map((b) => (
                            <tr key={b.id}>
                              <td>{b.user}</td>
                              <td>{b.tickets}</td>
                              <td>${b.amount}</td>
                              <td>
                                <span className={`status ${b.status}`}>
                                  {b.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* ================================================= */}
            {/* ================= ANALYTICS ===================== */}
            {/* ================================================= */}
            {activeTab === "analytics" && (
<>
  <h1>Analytics</h1>
  <p className="org-sub">Advanced performance insights</p>

  {/* ===== TOP METRICS ===== */}
  <div className="analytics-grid">
    <div className="analytic-card big">
      <h4>Total Revenue</h4>
      <h2>${totalRevenue.toLocaleString()}</h2>
      <div className="mini-bar purple"></div>
    </div>

    <div className="analytic-card big">
      <h4>Tickets Sold</h4>
      <h2>{ticketsSold}</h2>
      <div className="mini-bar blue"></div>
    </div>

    <div className="analytic-card big">
      <h4>Active Events</h4>
      <h2>{activeEvents}</h2>
      <div className="mini-bar pink"></div>
    </div>
  </div>

  {/* ===== REVENUE BAR ===== */}
  <div className="chart-card">
    <h3>Revenue by Event</h3>
    <div className="chart-box">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="revenue" fill="#7c3aed" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* ===== LINE TREND ===== */}
  <div className="chart-card">
    <h3>Monthly Revenue Trend</h3>
    <div className="chart-box">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* ===== PIE ===== */}
  <div className="chart-card">
    <h3>Events by Category</h3>
    <div className="chart-box">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {pieData.map((_, index) => (
              <Cell
                key={index}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Organizer;