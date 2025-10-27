import { Link, useLocation } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGlobe,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import about from "../assets/about.jpg"; 
import about1 from "../assets/about1.jpg"; 
import Footer from "../components/Footer.jsx"; 

export default function Home() {
  return (
    <>
    <div className="home-wrapper">
      {/* 🌟 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">INNOVATIVE BUSINESS SOLUTIONS</span>
          <h1 className="hero-title">
            Smart, Simple, and <br /> User-Friendly Business Planning
          </h1>
          <p className="hero-subtitle">
            Plan your business effectively with smart tools to calculate profits,
            analyze performance, and get AI-powered insights — all in one place.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary "> 
                      <Link style={{textDecoration:"none", color:"white"}}
                        to="/planner">Get Started Now </Link></button>
            <button className="btn-secondary">Learn More →</button>
          </div> 

          <div className="trusted">
            <p>TRUSTED BY ENTREPRENEURS WORLDWIDE</p>
            <div className="trusted-logos">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/768px-Airbnb_Logo_B%C3%A9lo.svg.png"
                alt="Airbnb"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
                alt="IBM"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                alt="Google"
              />
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={about}
            alt="Business planning"
          />
          <div className="mini-card">
            <h4>Expenses</h4>
            <p>$420.50</p>
            <ul>
              <li>Groceries – $120.50</li>
              <li>Internet – $50.00</li>
              <li>Marketing – $250.00</li>
            </ul>
          </div>
        </div>
      </section>
      
    </div>

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
  

{/* SERVICES SECTION */}
<section className="services-section">
  <h2 className="section-title">Our Services</h2>
  <p className="section-subtitle">
    Empower your small business with tools designed to plan, track, and grow — powered by AI.
  </p>

  <div className="services-grid">
    <div className="service-card">
      <h3>Smart Business Planner</h3>
      <p>Organize your goals, expenses, and projects with intelligent tracking and analytics.</p>
    </div>

    <div className="service-card">
      <h3>AI Marketing Assistant</h3>
      <p>Get AI-driven ideas for branding, slogans, and marketing content customized for your business.</p>
    </div>

    <div className="service-card">
      <h3>Performance Dashboard</h3>
      <p>Visualize your business progress and make data-based decisions with ease.</p>
    </div>

    <div className="service-card">
      <h3>Expense Tracker</h3>
      <p>Track costs, materials, and income effortlessly with automatic summaries and totals.</p>
    </div>

    <div className="service-card">
      <h3>Product Planner</h3>
      <p>Plan new products, set prices, and calculate profit margins for smart business growth.</p>
    </div>

    <div className="service-card">
      <h3>Marketing Tips Generator</h3>
      <p>Generate short slogans, posts, and campaign ideas for your target audience in seconds.</p>
    </div>
  </div>
</section>


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
