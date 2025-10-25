import React, { useState } from "react";


function MarketingTips() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAIResponse = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/ai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});


      const data = await res.json();
      console.log("🔹 API Response:", data); // 🧠 check what frontend receives

      if (data.result && data.result !== "No response generated.") {
        setResult(data.result);
      } else {
        setError("No response from AI.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>💡 AI Marketing Ideas</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask the AI for ideas, e.g., 'Suggest 3 slogans for handmade jewelry.'"
        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
      />

      <button onClick={getAIResponse} disabled={loading} style={{ padding: "10px 20px" }}>
        {loading ? "Thinking..." : "Get Ideas"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {result && (
        <div style={{ background: "#f5f5f5", padding: "10px", marginTop: "20px", borderRadius: "8px" }}>
          <h3>AI Suggestions:</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default MarketingTips;
