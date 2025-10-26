// api/ai.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = await req.json ? await req.json() : req.body;

    if (!prompt) {
      return res.status(400).json({ error: "No prompt provided" });
    }

    // ✅ Use your real API key from .env
    const apiKey = process.env.OPENAI_API_KEY;

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await aiRes.json();

    if (data?.choices?.[0]?.message?.content) {
      return res.status(200).json({ result: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: "No response generated." });
    }
  } catch (err) {
    console.error("AI error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
