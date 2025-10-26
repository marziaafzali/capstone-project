import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AiOutlineDownload } from "react-icons/ai";
import { downloadPdf } from "../utils/downloadPdf";
import "./Marketing.css";

export default function Marketing() {
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [chartData, setChartData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const res = await fetch("/api/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});
      const data = await res.json();
      const responseText = data.result || "No response from AI";
      setAiResponse(responseText);

      const suggestions = responseText.split(/\n(?=\d+\.)/).filter((tip) => tip.trim() !== "");
      const visualData = suggestions.map((tip, i) => ({
        name: `Tip ${i + 1}`,
        relevance: Math.floor(Math.random() * 40) + 60,
      }));
      setChartData(visualData);
    } catch (err) {
      console.error(err);
      setAiResponse("Failed to connect to the AI server.");
    }
  };

  return (
    <div className="marketing-page">
      <h1 className="dashboard-header">Marketing Insights</h1>

      {/* AI Prompt Form */}
      <div className="chart-box">
        <form className="ai-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI for business insights..."
            required
          />
          <button type="submit">Generate</button>
        </form>

        {/* AI Response */}
        {aiResponse && (
          <div className="ai-report">
            <h3>✨ AI Suggestions</h3>
            <div className="ai-card-container">
              {aiResponse
                .split(/\n(?=\d+\.)/)
                .filter((tip) => tip.trim() !== "")
                .map((tip, i) => (
                  <div className="ai-tip-card" key={i}>
                    <h4>{tip.split(":")[0]}</h4>
                    <p>{tip.split(":")[1] || tip}</p>
                  </div>
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

            <button className="download-btn" onClick={() => downloadPdf(aiResponse)}>
              <AiOutlineDownload /> Download PDF
            </button>
          </div>
        )}
      </div>

      {/* Marketing Tips */}
      <div className="stats-box">
        <h2>Marketing Tips</h2>
        <div className="ai-card-container">
          <div className="ai-tip-card">
            <h4>🎯 Define Your Target Audience</h4>
            <p>Focus your efforts on the right group of customers to increase conversions.</p>
          </div>
          <div className="ai-tip-card">
            <h4>📱 Be Consistent on Social Media</h4>
            <p>Consistency builds trust and keeps your brand visible.</p>
          </div>
          <div className="ai-tip-card">
            <h4>🧠 Tell a Story</h4>
            <p>Customers remember stories more than facts — share your brand journey!</p>
          </div>
          <div className="ai-tip-card">
            <h4>💡 Highlight Unique Features</h4>
            <p>Show what makes your product stand out from the competition.</p>
          </div>
          <div className="ai-tip-card">
            <h4>📊 Track & Improve</h4>
            <p>Analyze your performance and adapt your strategy regularly.</p>
          </div>
          <div className="ai-tip-card">
            <h4>🤝 Engage With Customers</h4>
            <p>Respond to feedback and create a community around your brand.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
