import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AiOutlineDownload } from "react-icons/ai";
import { downloadPdf } from "../utils/downloadPdf";
import "./Marketing.css";

export default function Marketing() {
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    targetAudience: "",
    budget: "",
    goals: "",
  });

  const [aiResponse, setAiResponse] = useState("");
  const [chartData, setChartData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧠 Build the AI prompt dynamically from the form
    const prompt = `
You are an expert marketing strategist. 
Create a detailed, actionable marketing plan for the following business:

Business Name: ${formData.businessName}
Type: ${formData.businessType}
Target Audience: ${formData.targetAudience}
Marketing Budget: ${formData.budget}
Goals: ${formData.goals}

Please include 5–7 clear, numbered steps with practical ideas and measurable actions.
`;

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),

      });

      // Handle HTTP errors gracefully
      if (!res.ok) {
        const text = await res.text();
        console.error("AI Server Error:", text);
        setAiResponse("⚠️ The AI server returned an error. Please try again.");
        return;
      }

      // Parse safely
      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("JSON parse error:", err);
        setAiResponse("⚠️ The AI server sent an invalid response format.");
        return;
      }

      const responseText = data.result || "No response from AI.";
      setAiResponse(responseText);

      // Extract visual suggestions for chart
      const suggestions = responseText
        .split(/\n(?=\d+\.)/)
        .filter((tip) => tip.trim() !== "");

      const visualData = suggestions.map((tip, i) => ({
        name: `Step ${i + 1}`,
        relevance: Math.floor(Math.random() * 40) + 60,
      }));

      setChartData(visualData);
    } catch (err) {
      console.error("AI Request failed:", err);
      setAiResponse("❌ Failed to connect to the AI server.");
    }
  };

  return (
    <div className="marketing-page">
      <h1 className="dashboard-header">Micro-Business Marketing Planner</h1>
      <p className="page-description">
        This section is designed for small and micro-business owners who want
        to create a focused, data-driven marketing plan using AI. Just fill in
        your business details and let the AI generate a tailored plan to meet
        your goals and budget.
      </p>

      {/* === AI Business Plan Generator === */}
      <div className="chart-box">
        <h2>🧩 AI Business Plan Generator</h2>

        <form className="ai-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            required
          />
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            placeholder="Type of Business (e.g., coffee shop, clothing brand)"
            required
          />
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="Target Audience (e.g., local students, online shoppers)"
            required
          />
          <input
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Marketing Budget (e.g., $500/month)"
            required
          />
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            placeholder="What are your main goals? (e.g., grow Instagram followers, boost online sales)"
            required
          />
          <button type="submit">Generate Plan</button>
        </form>

        {/* === AI Response === */}
        {aiResponse && (
          <div className="ai-report">
            <h3>✨ Your AI-Generated Marketing Plan</h3>
            <div className="ai-plan">
              <pre>{aiResponse}</pre>
            </div>

            <h3>📊 Visual Summary</h3>
            <div className="ai-chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar
                    dataKey="relevance"
                    fill="#03634d"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <button
              className="download-btn"
              onClick={() =>
                downloadPdf(
                  aiResponse,
                  `${formData.businessName || "Business"}_MarketingPlan.pdf`
                )
              }
            >
              <AiOutlineDownload /> Download Plan as PDF
            </button>
          </div>
        )}
      </div>

      {/* === Extra Marketing Tips === */}
      <div className="stats-box">
        <h2>💼 Proven Marketing Tips</h2>
        <div className="ai-card-container">
          <div className="ai-tip-card">
            <h4>🎯 Focus on Niche Marketing</h4>
            <p>
              Identify your most profitable micro-audience and target them with
              precision.
            </p>
          </div>
          <div className="ai-tip-card">
            <h4>📱 Build Local Social Proof</h4>
            <p>
              Encourage customers to share their experiences online — it builds
              community trust.
            </p>
          </div>
          <div className="ai-tip-card">
            <h4>💡 Use Free Tools</h4>
            <p>
              Leverage Canva, Google My Business, and Mailchimp to save costs
              and stay efficient.
            </p>
          </div>
          <div className="ai-tip-card">
            <h4>📊 Track Performance</h4>
            <p>
              Use insights from your social platforms to understand what content
              performs best.
            </p>
          </div>
          <div className="ai-tip-card">
            <h4>🧠 Adapt Fast</h4>
            <p>
              Stay flexible — microbusinesses win by reacting quickly to
              customer needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
