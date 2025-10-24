// api/ai.js
export default async function handler(req, res) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided." });
    }

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await aiRes.json();

    // send only the message text
    const text = data?.choices?.[0]?.message?.content || "No response generated.";
    res.status(200).json({ result: text });
  } catch (error) {
    console.error("AI API Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
