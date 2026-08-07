require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.AI_KEY,
});

let chatHistory = [];

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    chatHistory.push({
      role: "user",
      content: question,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are Mate, a friendly AI study assistant. Explain clearly, step by step, like a teacher.",
        },
        ...chatHistory,
      ],
    });

    const answer = response.output_text;

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
