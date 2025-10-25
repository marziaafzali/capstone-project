// api/ai.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    console.log("🟢 Received prompt:", prompt);

    const openaiRes = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 100,
      }),
    });

    const data = await openaiRes.json();

    if (data.choices && data.choices.length > 0) {
      return res.status(200).json({ result: data.choices[0].text.trim() });
    } else {
      return res.status(500).json({ error: "No response from OpenAI." });
    }

  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ error: "Failed to connect to OpenAI." });
  }
}
