import "./CTA.css";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-content">
            <h2>Ready to Host Your Own Event?</h2>
            <p>
              Create, manage, and grow your events with EventSphere’s powerful
              tools.
            </p>

            <Link to="/organizer" className="cta-btn">
              Start Creating →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;