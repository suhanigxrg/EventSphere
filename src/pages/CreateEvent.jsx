import Navbar from "../components/Navbar";
import "./CreateEvent.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import organizerEvents from "../data/organizerEvents";

function CreateEvent() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("edit");

  // mouse glow
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    category: "Music",
    price: "",
    description: "",
    imagePreview: null,
    status: "draft",
  });

  // preload edit
  useEffect(() => {
    if (editId) {
      const existing = organizerEvents.find(
        (e) => e.id === Number(editId)
      );
      if (existing) {
        setForm((f) => ({
          ...f,
          title: existing.title,
          date: existing.date,
          venue: existing.venue,
          price: existing.revenue || "",
          status: existing.status,
        }));
      }
    }
  }, [editId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = () => {
    alert(editId ? "Event Updated (demo)" : "Event Created (demo)");
    navigate("/organizer");
  };

  return (
    <>
      <Navbar />

      <div
        className="create-page"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        style={{
          "--mx": mouse.x + "px",
          "--my": mouse.y + "px",
        }}
      >
        {/* background layers */}
        <div className="bg-grid"></div>
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-noise"></div>

        <div className="create-wrapper">
          <div className="create-card">
            <h1>{editId ? "Edit Event" : "Create Event"}</h1>
            <p className="create-sub">
              Fill the details to publish your event
            </p>

            {/* 🔥 IMAGE (ONLY ONE — matches your cards) */}
            <div className="upload-box single">
              <label>Event Image</label>
              <input type="file" onChange={handleImage} />

              {form.imagePreview && (
                <img src={form.imagePreview} alt="preview" />
              )}
            </div>

            {/* 🔥 MAIN FORM */}
            <div className="form-grid">
              <div className="input-group">
                <label>Event Title</label>
                <input
                  name="title"
                  placeholder="Neon Nights Music Festival"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Date</label>
                <input
                  name="date"
                  placeholder="Mar 15, 2026"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Time</label>
                <input
                  name="time"
                  placeholder="7:00 PM"
                  value={form.time}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Venue</label>
                <input
                  name="venue"
                  placeholder="Madison Square Garden"
                  value={form.venue}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Music</option>
                  <option>Technology</option>
                  <option>Sports</option>
                  <option>Business</option>
                </select>
              </div>

              <div className="input-group">
                <label>Ticket Price ($)</label>
                <input
                  name="price"
                  placeholder="89"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group full">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Describe your event experience..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="create-actions">
              <button
                className="ghost-btn"
                onClick={() => navigate("/organizer")}
              >
                Cancel
              </button>

              <button
                className="primary-btn"
                onClick={handleSubmit}
              >
                {editId ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEvent;