import { askAI } from "./ai";

export async function generateQuiz(topic: string) {
  const prompt = `
Create a 5 question quiz about ${topic}.

Use this exact format:

Question: What is 2 + 2?
A) 3
B) 4
C) 5
D) 6
Answer: B

Create simple student questions.
`;

  return await askAI(prompt);
}
