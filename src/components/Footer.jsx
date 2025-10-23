import React from "react";
import "./Footer.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="newsletter">
        <div className="newsletter-text">
          <h3>Stay Productive Every Day</h3>
          <p>
            Join our community to get the latest updates, productivity tips,
            and exclusive AI planner features right in your inbox.
          </p>
        </div>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Footer Main Content */}
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-about">
          <h4>About</h4>
          <p>
            SmartPlanner helps individuals and teams stay organized,
            productive, and balanced every day. Powered by AI, it assists you
            in planning smarter, managing time effectively, and achieving goals
            with clarity.
          </p>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Careers <span className="hiring">we’re hiring</span></a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="footer-links">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">User Guide</a></li>
            <li><a href="#">Community Forum</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">AI Suggestion Tips</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>
            <FaMapMarkerAlt className="footer-icon" /> Kabul, Afghanistan
          </p>
          <p>
            <FaEnvelope className="footer-icon" /> contact@smartplanner.ai
          </p>
          <p>
            <FaPhoneAlt className="footer-icon" /> +93 700 123 456
          </p>
          <p>
            <FaGlobe className="footer-icon" /> www.smartplanner.ai
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © 2025 SmartPlanner. All rights reserved. Designed with ❤️ to help
          you plan better, every day.
        </p>
        <p>
          Developed by <a href="#">Marzia Afzali</a> for CodeWeekend Boatcamp project.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
