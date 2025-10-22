import React from "react";
import about1 from "../assets/about1.jpg"; 
import Footer from "../components/Footer.jsx"; 

const About = () => {
  return (
    <div className="about-page">
      {/* ====== ABOUT US SECTION ====== */}
      <section className="about-section">
        <div className="about-image">
          <img
            src={about1}
            alt="About"
          />
          <div className="mission-card">
            <div className="mission-icon">💡</div>
            <div>
              <h4>MISSION STATEMENT</h4>
              <p>
                Our mission is to empower individuals and businesses by
                delivering secure, efficient, and user-friendly planning tools.
              </p>
            </div>
          </div>
        </div>

        <div className="about-content">
          <span className="about-tag">ABOUT US</span>
          <h2>
            Experience the future of business planning with our secure,
            efficient, and user-friendly services
          </h2>
          <p>
            Founded with the vision of helping small businesses grow, we are
            dedicated to providing innovative and easy-to-use tools that help
            manage your goals and improve productivity.
          </p>
          <p>
            Our modern platform ensures your tasks are streamlined, organized,
            and easy to manage — empowering you to take control of your business
            journey with confidence.
          </p>

          
          <div style={{marginBottom:"-10px", marginTop:"50px" }}><h4>Key Values and Vision</h4></div>
          <div className="values-grid">
            <span>✅ Innovation</span>
            <span>✅ Security</span>
            <span>✅ User-Centric Design</span>
            <span>✅ Transparency</span>
            <span>✅ Empowerment</span>
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE US SECTION ====== */}
      <div className="why-section">
        <div className="why-left">
          <h2>Why Choose Us</h2>
          <p>
            Experience the future of planning with our secure, efficient, and
            easy-to-use productivity tools. Our system is designed to help you
            manage your daily tasks with confidence and convenience.
          </p>
          <button className="video-btn">▶ Watch the Video</button>
        </div>

        <div className="why-right">
          <div className="feature">
            <div className="icon">👩‍💻</div>
            <h4>User-Friendly Interface</h4>
            <p>Easy navigation with a clean, responsive design.</p>
          </div>

          <div className="feature">
            <div className="icon">📊</div>
            <h4>Smart Analytics</h4>
            <p>Track progress, analyze data, and improve performance.</p>
          </div>

          <div className="feature">
            <div className="icon">🎧</div>
            <h4>Customer Support</h4>
            <p>24/7 support via chat, email, or phone assistance.</p>
          </div>

          <div className="feature">
            <div className="icon">🔒</div>
            <h4>Data Security</h4>
            <p>End-to-end encryption to protect your information.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
