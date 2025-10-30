import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();

// ✅ allow only your frontend origin
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://capstone-project-one-theta.vercel.app"], // allow both ports
  methods: ["GET", "POST"],
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("🟢 Received prompt:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const message = completion.choices[0].message.content;
    console.log("🟣 AI Response:", message);
    res.json({ result: message });
  } catch (err) {
    console.error("❌ AI request failed:", err);
    res.status(500).json({ error: "AI request failed." });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
