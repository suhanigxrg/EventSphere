import "./Hero.css";
import stadium from "../assets/stadium.jpg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {

  const [search, setSearch] = useState("");
const navigate = useNavigate();
const handleSearch = () => {
  navigate(`/explore?q=${encodeURIComponent(search)}`);
};
  return (
    <section className="hero">
      {/* background image */}
      <img src={stadium} alt="stadium" className="hero-bg" />

      {/* dark overlay */}
      <div className="hero-overlay" />

      {/* content */}
      <div className="hero-content container">
        <div className="hero-badge">↗ 2,500+ Events This Month</div>

        <h1 className="hero-title">
          Discover <span>Unforgettable</span> Experiences
        </h1>

        <p className="hero-subtitle">
          Find and book the hottest concerts, tech conferences, food festivals,
          and more — all in one place.
        </p>

        <div className="hero-search">
          <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
         <button className="primary-btn" onClick={handleSearch}>
  Explore Events
</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;