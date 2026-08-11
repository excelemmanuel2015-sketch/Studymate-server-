require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

let chatHistory = [];

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({
        answer: "Please ask me a question.",
      });
    }

    chatHistory.push({
      role: "user",
      content: question,
    });

    const conversation = chatHistory
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversation,
      config: {
        systemInstruction:
          "You are Mate, a friendly AI study assistant. Explain clearly, step by step, like a teacher.",
      },
    });

    const answer = response.text;

    chatHistory.push({
      role: "assistant",
      content: answer,
    });

    res.json({
      answer,
    });
  } catch (error) {
    console.log(error);

    res.json({
      answer: "⚠️ Mate had a connection problem.",
    });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("StudyMate AI server running on port 3000");
});
