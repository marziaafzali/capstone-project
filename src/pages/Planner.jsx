// src/pages/Planner.jsx
import ProductPlanner from "../components/ProductPlanner";
import MarketingTips from "../components/MarketingTips";
import Footer from "../components/Footer.jsx"; 

export default function Planner() {
  return (
    <>
    <div style={{ padding: "2rem" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "#333",
          fontSize: "2rem",
        }}
      >
        🧾 Business Product Planner
      </h1>

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
