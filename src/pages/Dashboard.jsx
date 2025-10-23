import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  // Derived stats
  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const totalCost = products.reduce((sum, p) => sum + p.cost, 0);
  const totalProfit = products.reduce((sum, p) => sum + p.profit, 0);
  const totalProducts = products.length;

  // Prepare chart data (profit trend)
  const chartData = products.map((p, i) => ({
    name: p.name || `Item ${i + 1}`,
    profit: p.profit,
    cost: p.cost,
    price: p.price,
  }));

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>
        <div className="stat-card green">
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card yellow">
          <h3>Total Cost</h3>
          <p>${totalCost.toFixed(2)}</p>
        </div>
        <div className="stat-card purple">
          <h3>Total Profit</h3>
          <p>${totalProfit.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-box">
          <h3>Profit Trend</h3>
          {products.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", color: "#777" }}>
              No data yet. Add products in the Product Planner.
            </p>
          )}
        </div>

        <div className="chart-box small">
          <h3>Stats Report</h3>
          <div className="report-grid">
            <div className="report-item teal">
              Income <span>${totalRevenue.toFixed(2)}</span>
            </div>
            <div className="report-item sky">
              Profit <span>${totalProfit.toFixed(2)}</span>
            </div>
            <div className="report-item orange">
              Cost <span>${totalCost.toFixed(2)}</span>
            </div>
            <div className="report-item pink">
              Products <span>{totalProducts}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
