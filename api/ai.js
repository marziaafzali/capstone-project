import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI marketing assistant." },
        { role: "user", content: prompt },
      ],
    });

    const result = completion.choices?.[0]?.message?.content || "No result.";
    res.status(200).json({ result });
  } catch (error) {
    console.error("AI API Error:", error);
    res.status(500).json({ error: "AI request failed", details: error.message });
  }
}
