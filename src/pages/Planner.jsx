// src/pages/Planner.jsx
import ProductPlanner from "../components/ProductPlanner";
import MarketingTips from "../components/MarketingTips";
import Footer from "../components/Footer.jsx"; 

export default function Planner() {
  return (
    <>
    <div style={{ padding: "2rem" }}>
     
      <h1 className="dashboard-header">🧾 Business Product Planner</h1>
      <p className="page-description">
        This section is designed for entrepreneurs, small business owners, and product managers who want to plan, track, and optimize their product ideas. Use the Product Planner to outline product features, define goals, estimate costs, and manage timelines. It helps you make smarter decisions before launching a new product or improving an existing one.
      </p>
      <p
        style={{
          textAlign: "center",
          color: "#555",
          maxWidth: "600px",
          margin: "0 auto 2rem",
        }}
      >
        Add your products, calculate costs and profits, and manage your small business easily.
      </p>

      {/* Product planner section */}
      <ProductPlanner />
   
    </div>
     
    </>
  );
}
