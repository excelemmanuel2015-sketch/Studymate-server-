require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

function getStudyAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("math") || q.includes("algebra") || q.includes("calculus")) {
    return `📘 Mathematics

You asked: "${question}"

Let's solve it step by step. Break the problem into smaller parts, identify the formula or rule you need, substitute the known values, and check your answer.

Send me the exact mathematics question and I'll help you work through it.`;
  }

  if (q.includes("chemistry") || q.includes("chemical") || q.includes("atom")) {
    return `🧪 Chemistry

You asked: "${question}"

Start by identifying the topic, then write down the known information and the relevant chemical rule or equation.

Send me the exact chemistry question and I'll help you study it step by step.`;
  }

  if (q.includes("biology") || q.includes("cell") || q.includes("organism")) {
    return `🧬 Biology

You asked: "${question}"

Let's understand it rather than memorize it. Identify the biological process or structure, what it does, and why it is important.

Send me the exact biology question and I'll explain it clearly.`;
  }

  if (q.includes("physics") || q.includes("force") || q.includes("motion") || q.includes("energy")) {
    return `⚡ Physics

You asked: "${question}"

Start with the known values, identify the physical quantity you need, choose the appropriate formula, substitute the values, and check the units.

Send me the exact physics question and I'll work through it step by step.`;
  }

  if (q.includes("economics") || q.includes("demand") || q.includes("supply")) {
    return `📊 Economics

You asked: "${question}"

First identify the economic concept involved, then define it, explain how it works, and give a simple example.

Send me the exact economics question and I'll explain it clearly.`;
  }

  return `📚 Mate Study Assistant

You asked: "${question}"

I'm ready to help you study. Send me a specific question and include the subject if possible.

For example:
• "Explain photosynthesis"
• "Solve 2x + 5 = 15"
• "What is Newton's second law?"
• "Explain the law of demand"

I'll guide you through the topic step by step.`;
}

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "StudyMate server is running."
  });
});

app.post("/ask", (req, res) => {
  try {
    const question = req.body.question;

    if (!question || typeof question !== "string") {
      return res.status(400).json({
        answer: "Please send a study question."
      });
    }

    res.json({
      answer: getStudyAnswer(question)
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer: "⚠️ Mate had a connection problem."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StudyMate server running on port ${PORT}`);
});
