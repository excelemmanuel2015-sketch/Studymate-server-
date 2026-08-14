require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "StudyMate server is running.",
    ai: apiKey ? "ready" : "not configured",
  });
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({
        answer: "Please ask me a question.",
      });
    }

    if (!ai) {
      return res.status(500).json({
        answer: "Mate's AI is not configured yet.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `You are MATE, a friendly AI study assistant.

Help the student understand things clearly and accurately.

Rules:
- Explain difficult topics in simple language.
- Show steps when solving problems.
- Give examples when useful.
- Encourage learning rather than simply giving answers.
- Keep responses appropriate for students.

Student's question:
${question}`,
    });

    res.json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      answer: "Mate couldn't generate an answer right now. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StudyMate AI server running on port ${PORT}`);
});
