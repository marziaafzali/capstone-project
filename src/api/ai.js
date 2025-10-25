export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await openAIResponse.json();

    if (data.error) {
      console.error("🔴 OpenAI API Error:", data.error);
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({
      result: data.choices?.[0]?.message?.content || "No response generated.",
    });
  } catch (err) {
    console.error("🔴 Server Error:", err);
    res.status(500).json({ error: "Failed to connect to AI API" });
  }
}
