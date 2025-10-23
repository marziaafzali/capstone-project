import Footer from "../components/Footer.jsx"; 


function Services() {
  return (
    <>
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
<Footer/>
</>

);
}

export default Services;