import React from "react";
import Footer from "../components/Footer.jsx"; 

import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGlobe,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

function Contact() {
  return (
  <>
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-subtitle">
        Have a question or want to collaborate? Reach out — we’d love to hear from you!
      </p>

      <div className="contact-container">
        {/* LEFT SIDE — CONTACT INFO */}
        <div className="contact-info">
          <h3>Contact Information</h3>

          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div>
              <h4>Email</h4>
              <p>marzia@example.com</p>
            </div>
          </div>

          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <div>
              <h4>Phone</h4>
              <p>+93 700 123 456</p>
            </div>
          </div>

          <div className="contact-item">
            <FaLinkedin className="contact-icon" />
            <div>
              <h4>LinkedIn</h4>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/yourprofile
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — CONTACT FORM */}
        <div className="contact-form">
          <h3>Send a Message</h3>
          <form>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />

            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Write your message..." required />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
     <Footer/>
    </>
  
  );
}

export default Contact;
