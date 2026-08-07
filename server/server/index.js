const express = require("express");

const app = express();

app.use(express.json());

app.post("/ask", async (req, res) => {
  const question = req.body.question;

  res.json({
    answer:
      "🤖 Mate received your question: " + question
  });
});

app.listen(3000, () => {
  console.log("StudyMate AI server running on port 3000");
});
