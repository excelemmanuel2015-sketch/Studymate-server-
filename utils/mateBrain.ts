export function getMateReply(question: string) {
  const q = question.toLowerCase();

  // Math mode
  const math = q.match(/(\d+)\s*([+\-x*/])\s*(\d+)/);

  if (math) {
    const a = Number(math[1]);
    const op = math[2];
    const b = Number(math[3]);

    if (op === "+") return `🧮 ${a} + ${b} = ${a + b}`;
    if (op === "-") return `🧮 ${a} - ${b} = ${a - b}`;
    if (op === "x" || op === "*") return `🧮 ${a} × ${b} = ${a * b}`;
    if (op === "/") return `🧮 ${a} ÷ ${b} = ${a / b}`;
  }

  // Biology
  if (q.includes("photosynthesis")) {
    return "🌱 Photosynthesis is the process where green plants use sunlight, water, and carbon dioxide to make food and release oxygen.";
  }

  if (q.includes("cell")) {
    return "🧬 A cell is the basic unit of life. All living things are made of one or more cells.";
  }

  // Chemistry
  if (q.includes("atom")) {
    return "⚛️ An atom is the smallest unit of an element that keeps the properties of that element.";
  }

  if (q.includes("acid")) {
    return "🧪 Acids are substances that release hydrogen ions (H⁺) when dissolved in water.";
  }

  // Physics
  if (q.includes("force")) {
    return "⚡ Force is a push or pull that can change the motion of an object.";
  }

  if (q.includes("energy")) {
    return "🔋 Energy is the ability to do work or cause change.";
  }

  // Economics
  if (q.includes("inflation")) {
    return "💰 Inflation is the general increase in prices of goods and services over time.";
  }

  return "📚 I'm still learning this topic. Try asking me about Math, Biology, Chemistry, Physics, or Economics.";
}
