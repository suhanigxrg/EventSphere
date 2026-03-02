import "./Categories.css";

const categories = [
  "Music",
  "Technology",
  "Sports",
  "Arts",
  "Food & Drink",
  "Business",
  "Entertainment",
  "Wellness",
];

function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <h2 className="section-title center">Browse by Category</h2>
        <p className="cat-sub">
          Find events that match your interests
        </p>

        <div className="cat-grid">
          {categories.map((cat, index) => (
            <div key={index} className="cat-card">
              <div className="cat-icon">🎟️</div>
              <h4>{cat}</h4>
              <span>120 events</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;