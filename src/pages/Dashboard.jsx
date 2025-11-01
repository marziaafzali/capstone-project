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

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const totalCost = products.reduce((sum, p) => sum + p.cost, 0);
  const totalProfit = products.reduce((sum, p) => sum + p.profit, 0);
  const totalProducts = products.length;

  const chartData = products.map((p, i) => ({
    name: p.name || `Item ${i + 1}`,
    profit: p.profit,
    cost: p.cost,
    price: p.price,
  }));

  return (
    <div className="dashboard-page">
      
        <h1 className="dashboard-header">Dashboard Overview</h1>
      <p className="page-description">
       The Dashboard provides a bird’s-eye view of your business performance. Monitor key metrics, track progress, and visualize insights in one place. With real-time stats, charts, and summaries, the Dashboard helps you stay informed and make data-driven decisions quickly.
      </p>
      {/* Top Stats Cards */}
      <div className="top-stats">
        <div className="top-card">
          <div className="icon user">👤</div>
          <div>
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </div>
        </div>
        <div className="top-card">
          <div className="icon calendar">📅</div>
          <div>
            <h3>Total Revenue</h3>
            <p>${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="top-card">
          <div className="icon video">💰</div>
          <div>
            <h3>Total Cost</h3>
            <p>${totalCost.toFixed(2)}</p>
          </div>
        </div>
        <div className="top-card">
          <div className="icon like">📈</div>
          <div>
            <h3>Total Profit</h3>
            <p>${totalProfit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Chart + Stats Reports */}
      <div className="dashboard-content">
        {/* Left Chart */}
        <div className="chart-box">
          <h2>Daily Reports</h2>
          {products.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#facc15" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="no-data">No data available. Add some products!</p>
          )}
        </div>

        {/* Right Stats */}
        <div className="stats-box">
          <h2>Stats Report</h2>
          <div className="report-cards">
            <div className="report-card income">
              <h4>Income</h4>
              <p>${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="report-card sales">
              <h4>Profit</h4>
              <p>${totalProfit.toFixed(2)}</p>
            </div>
            <div className="report-card users">
              <h4>Cost</h4>
              <p>${totalCost.toFixed(2)}</p>
            </div>
            <div className="report-card orders">
              <h4>Products</h4>
              <p>{totalProducts}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
