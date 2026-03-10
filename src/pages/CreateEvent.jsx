import Navbar from "../components/Navbar";
import "./CreateEvent.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addOrganizerEvent,
  getCurrentUser,
  getOrganizerEvents,
  updateOrganizerEvent,
} from "../utils/storage";

function CreateEvent() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const editId = params.get("edit");

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
  });

  // Load event if editing
  useEffect(() => {
    if (!editId) return;

    const events = getOrganizerEvents();
    const existing = events.find((e) => e.id === Number(editId));

    if (existing) {
      setForm({
        title: existing.title || "",
        date: existing.date || "",
        time: existing.time || "",
        venue: existing.location || "",
        category: existing.category || "Music",
        price: existing.price || "",
        description: existing.description || "",
        imagePreview: existing.image || null,
      });
    }
  }, [editId]);

  // Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setForm({
      ...form,
      imagePreview: imageUrl,
    });
  };

  // Submit
  const handleSubmit = () => {
    const user = getCurrentUser();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!form.title || !form.date || !form.venue) {
      alert("Please fill required fields");
      return;
    }

    const payload = {
      id: editId ? Number(editId) : Date.now(),

      organizerId: user.id,

      title: form.title,
      category: form.category,

      date: form.date,
      time: form.time,

      location: form.venue,

      price: Number(form.price),

      image: form.imagePreview,

      description: form.description,

      rating: 4.5,

      attendees: 0,
      sold: 0,
      revenue: 0,

      ticketTypes: [
        {
          name: "General Admission",
          price: Number(form.price),
        },
      ],

      organizer: {
        name: user.name || "Organizer",
        role: "Host",
        avatarLetter: (user.name || "O")[0],
      },

      venueDetails: {
        name: form.venue,
        capacity: 500,
      },

      status: "published",
    };

    if (editId) {
      updateOrganizerEvent(Number(editId), payload);
    } else {
      addOrganizerEvent(payload);
    }

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
        <div className="create-wrapper">
          <div className="create-card">
            <h1>{editId ? "Edit Event" : "Create Event"}</h1>

            {/* Image Upload */}
            <div className="upload-box single">
              <label>Event Image</label>
              <input type="file" accept="image/*" onChange={handleImage} />

              {form.imagePreview && (
                <img src={form.imagePreview} alt="preview" />
              )}
            </div>

            {/* Form */}
            <div className="form-grid">
              <div className="input-group">
                <label>Event Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Venue</label>
                <input
                  name="venue"
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
                  <option>Art</option>
                </select>
              </div>

              <div className="input-group">
                <label>Ticket Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group full">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="create-actions">
              <button
                className="ghost-btn"
                onClick={() => navigate("/organizer")}
              >
                Cancel
              </button>

              <button className="primary-btn" onClick={handleSubmit}>
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