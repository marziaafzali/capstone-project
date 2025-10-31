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
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // helper: clean returned AI text
function cleanAiText(raw) {
  if (!raw) return "";

  // 1) If server returned HTML, strip tags
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(raw, "text/html");
    raw = doc.body.textContent ?? raw;
  } catch (e) {
    // fallback: no DOMParser available (should be available in browser)
  }

  // 2) Replace smart quotes/dashes that break jsPDF rendering
  raw = raw
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/—/g, "-")
    .replace(/\u00A0/g, " "); // non-breaking spaces

  // 3) Normalize line endings and collapse many blank lines to a single blank line
  raw = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\n{3,}/g, "\n\n");

  // 4) Trim whitespace and ensure numbered list lines are on their own lines
  // If AI returns "1. Step one 2. Step two" -> insert newline before numbers
  raw = raw.replace(/(\d+)\.\s+/g, "\n$1. ").trim();

  return raw;
}

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setAiResponse("");

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

  // 🧹 Helper to clean and normalize messy AI text
  const cleanAiText = (raw) => {
    if (!raw) return "";

    // 1️⃣ Strip HTML tags
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(raw, "text/html");
      raw = doc.body.textContent ?? raw;
    } catch {}

    // 2️⃣ Remove Markdown symbols (###, **, etc.)
    raw = raw
      .replace(/\*\*(.*?)\*\*/g, "$1") // remove bold
      .replace(/#+\s*/g, "") // remove headers
      .replace(/[-*_]{2,}/g, "") // remove separators
      .replace(/\[(.*?)\]\(.*?\)/g, "$1") // remove links
      .replace(/\u00A0/g, " "); // replace non-breaking spaces

    // 3️⃣ Normalize newlines and step numbering
    raw = raw
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/(\d+)\.\s*/g, "\n$1. ") // ensure proper numbering
      .trim();

    return raw;
  };

  try {
    const API_URL =
      import.meta.env.MODE === "development"
        ? "http://localhost:5000/api/ai"
        : "https://capstone-project-one-theta.vercel.app/api/ai"; // ✅ Live backend

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("AI Server Error:", text);
      setAiResponse("⚠️ The AI server returned an error. Please try again.");
      setLoading(false);
      return;
    }

    const data = await res.json();

    // ✅ Clean up the AI response
    const rawResponse = data.result || data.text || "No response from AI.";
    const cleanedResponse = cleanAiText(rawResponse);

    setAiResponse(cleanedResponse);

    // ✅ Extract step list for visualization
    const suggestions = cleanedResponse
      .split(/\n(?=\d+\.)/)
      .map((tip) => tip.trim())
      .filter(Boolean);

    const visualData = suggestions.map((tip, i) => ({
      name: `Step ${i + 1}`,
      relevance: Math.floor(Math.random() * 40) + 60,
    }));

    setChartData(visualData);
  } catch (err) {
    console.error("AI Request failed:", err);
    setAiResponse("❌ Failed to connect to the AI server.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="marketing-page">
      <h1 className="dashboard-header">Micro-Business Marketing Planner</h1>
      <p className="page-description">
        This tool helps small and micro-business owners generate a data-driven
        marketing plan with AI. Fill in your details and let the AI design a
        plan tailored to your goals and budget.
      </p>

      <div className="chart-box">
        <h2>🧩 AI Marketing Plan Generator</h2>

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
            placeholder="Main Goals (e.g., boost online sales, grow social media)"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "⚙️ Generating..." : "Generate Plan"}
          </button>
        </form>

        {aiResponse && (
          <div className="ai-report">
            <h3>✨ Your AI-Generated Marketing Plan</h3>
            <div className="ai-plan">
              {aiResponse.split(/\n(?=\d+\.)/).map((line, idx) => (
                <p key={idx} className="ai-step">
                  {line.trim()}
                </p>
              ))}
            </div>

            <h3>📊 Visual Summary</h3>
            <div className="ai-chart">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="relevance" fill="#03634d" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          <button
  className="download-btn"
  onClick={() =>
    downloadPdf(
      aiResponse,
      `${formData.businessName || "Business"}_MarketingPlan.pdf`,
      formData // ✅ send the business info
    )
  }
>
  <AiOutlineDownload /> Download Plan as PDF
</button>

          </div>
        )}
      </div>
    </div>
  );
}
