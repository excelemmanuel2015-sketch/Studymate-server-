export function parseQuiz(text: string) {
  const blocks = text
    .split("Question:")
    .filter((q) => q.trim());

  return blocks.map((block) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const question = lines[0] || "";

    const options = lines
      .filter((line) =>
        /^[A-D]\)/.test(line)
      )
      .map((line) =>
        line.replace(/^[A-D]\)/, "").trim()
      );

    const answerLine = lines.find((line) =>
      line.startsWith("Answer:")
    );

    const answer = answerLine
      ? answerLine.replace("Answer:", "").trim()
      : "";

    return {
      question,
      options,
      answer,
    };
  });
}
