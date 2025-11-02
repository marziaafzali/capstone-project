import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import Footer from "../components/Footer.jsx";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
} from "react-icons/fa";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_7nhk6b9",   
        "template_nz2dr0e",  
        form.current,
        "5-auAoP7hgxn9cGFv"   
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          console.error(error);
          setStatus("❌ Failed to send message. Try again later.");
        }
      );
  };

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
                <p>afzalimarzia2004@gmail.com</p>
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
                  href="https://linkedin.com/in/marziaafzali"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/marziaafzali
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — CONTACT FORM */}
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form ref={form} onSubmit={sendEmail}>
              <label htmlFor="name">Your Name</label>
              <input type="text" name="from_name" id="name" placeholder="Enter your name" required />

              <label htmlFor="email">Your Email</label>
              <input type="email" name="from_email" id="email" placeholder="Enter your email" required />

              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="5" placeholder="Write your message..." required />

              <button type="submit">Send Message</button>
            </form>

            {status && (
              <p style={{ marginTop: "10px", color: status.startsWith("✅") ? "green" : "red" }}>
                {status}
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
