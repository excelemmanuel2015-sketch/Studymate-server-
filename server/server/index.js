require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api").default;

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ TELEGRAM_BOT_TOKEN is missing from .env");
  process.exit(1);
}

const bot = new TelegramBot(token, {
  polling: true,
});

console.log("🤖 StudyMate Telegram bot is running!");

/* =========================
   QUIZ QUESTIONS
========================= */

const quizzes = {
  Mathematics: [
    {
      question: "What is 5 × 6?",
      options: ["20", "25", "30", "35"],
      answer: "30",
    },
    {
      question: "What is 100 ÷ 4?",
      options: ["20", "25", "30", "40"],
      answer: "25",
    },
    {
      question: "What is 12 + 8?",
      options: ["18", "20", "22", "24"],
      answer: "20",
    },
  ],

  Biology: [
    {
      question: "Which organ pumps blood around the body?",
      options: ["Lungs", "Heart", "Kidney", "Brain"],
      answer: "Heart",
    },
    {
      question: "What gas do humans need for respiration?",
      options: [
        "Oxygen",
        "Helium",
        "Hydrogen",
        "Carbon dioxide",
      ],
      answer: "Oxygen",
    },
    {
      question: "What is the basic unit of life?",
      options: ["Tissue", "Organ", "Cell", "Bone"],
      answer: "Cell",
    },
  ],

  Chemistry: [
    {
      question: "What is the chemical symbol for oxygen?",
      options: ["O", "Ox", "C", "H"],
      answer: "O",
    },
    {
      question: "What is H₂O commonly called?",
      options: ["Salt", "Water", "Oxygen", "Hydrogen"],
      answer: "Water",
    },
    {
      question: "What is the chemical symbol for hydrogen?",
      options: ["H", "He", "Hy", "Hg"],
      answer: "H",
    },
  ],

  Physics: [
    {
      question: "What is the SI unit of force?",
      options: ["Joule", "Newton", "Watt", "Pascal"],
      answer: "Newton",
    },
    {
      question: "What is the approximate acceleration due to gravity on Earth?",
      options: ["5 m/s²", "9.8 m/s²", "15 m/s²", "20 m/s²"],
      answer: "9.8 m/s²",
    },
    {
      question: "What is the SI unit of energy?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      answer: "Joule",
    },
  ],

  Economics: [
    {
      question: "What is the basic economic problem?",
      options: [
        "Inflation",
        "Scarcity",
        "Taxation",
        "Profit",
      ],
      answer: "Scarcity",
    },
    {
      question:
        "When price normally increases, what happens to quantity demanded?",
      options: [
        "It increases",
        "It decreases",
        "It doubles",
        "It disappears",
      ],
      answer: "It decreases",
    },
    {
      question: "What is money mainly used as?",
      options: [
        "A medium of exchange",
        "A type of food",
        "A natural resource",
        "A crop",
      ],
      answer: "A medium of exchange",
    },
  ],

  "Agricultural Science": [
    {
      question: "Which of these is a farm animal?",
      options: ["Goat", "Maize", "Cassava", "Mango"],
      answer: "Goat",
    },
    {
      question: "Which crop is commonly used to produce garri?",
      options: ["Cassava", "Rice", "Wheat", "Cocoa"],
      answer: "Cassava",
    },
    {
      question: "Which of these is a cereal crop?",
      options: ["Maize", "Goat", "Cattle", "Fish"],
      answer: "Maize",
    },
  ],
};

/* =========================
   USER DATA
========================= */

const userQuiz = {};
const progress = {};

/* =========================
   MAIN MENU
========================= */

function mainMenu(chatId) {
  bot.sendMessage(chatId, "🏠 StudyMate Main Menu", {
    reply_markup: {
      keyboard: [
        ["📚 Study", "📝 Quiz"],
        ["📊 Progress", "💡 Study Tips"],
        ["❓ Help"],
      ],
      resize_keyboard: true,
    },
  });
}

/* =========================
   QUIZ MENU
========================= */

function quizMenu(chatId) {
  bot.sendMessage(chatId, "📝 Choose a quiz subject:", {
    reply_markup: {
      keyboard: [
        ["Mathematics", "Biology"],
        ["Chemistry", "Physics"],
        ["Economics", "Agricultural Science"],
        ["🔙 Main Menu"],
      ],
      resize_keyboard: true,
    },
  });
}

/* =========================
   START QUIZ
========================= */

function startQuiz(chatId, subject) {
  userQuiz[chatId] = {
    subject,
    currentQuestion: 0,
    score: 0,
  };

  sendQuestion(chatId);
}

/* =========================
   SEND QUESTION
========================= */

function sendQuestion(chatId) {
  const quiz = userQuiz[chatId];

  if (!quiz) return;

  const questions = quizzes[quiz.subject];

  if (quiz.currentQuestion >= questions.length) {
    finishQuiz(chatId);
    return;
  }

  const question = questions[quiz.currentQuestion];

  bot.sendMessage(
    chatId,
    `📝 Question ${quiz.currentQuestion + 1}/${questions.length}

${question.question}`,
    {
      reply_markup: {
        keyboard: question.options.map((option) => [option]),
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
}

/* =========================
   FINISH QUIZ
========================= */

function finishQuiz(chatId) {
  const quiz = userQuiz[chatId];
  const total = quizzes[quiz.subject].length;

  if (!progress[chatId]) {
    progress[chatId] = {
      quizzes: 0,
      questions: 0,
      correct: 0,
      subjects: {},
    };
  }

  progress[chatId].quizzes++;
  progress[chatId].questions += total;
  progress[chatId].correct += quiz.score;

  if (!progress[chatId].subjects[quiz.subject]) {
    progress[chatId].subjects[quiz.subject] = {
      quizzes: 0,
      questions: 0,
      correct: 0,
    };
  }

  progress[chatId].subjects[quiz.subject].quizzes++;
  progress[chatId].subjects[quiz.subject].questions += total;
  progress[chatId].subjects[quiz.subject].correct += quiz.score;

  const percentage = Math.round(
    (quiz.score / total) * 100
  );

  bot.sendMessage(
    chatId,
    `🎉 Quiz Complete!

📚 ${quiz.subject}
🏆 Score: ${quiz.score}/${total}
📈 Percentage: ${percentage}%

Keep studying! 💪`,
    {
      reply_markup: {
        keyboard: [
          ["📝 Quiz", "📊 Progress"],
          ["📚 Study", "🏠 Main Menu"],
        ],
        resize_keyboard: true,
      },
    }
  );

  delete userQuiz[chatId];
}

/* =========================
   PROGRESS
========================= */

function showProgress(chatId) {
  const data = progress[chatId];

  if (!data || data.quizzes === 0) {
    bot.sendMessage(
      chatId,
      `📊 Your Progress

You haven't completed a quiz yet.

Start one with 📝 Quiz!`
    );
    return;
  }

  const percentage = Math.round(
    (data.correct / data.questions) * 100
  );

  let message = `📊 Your Study Progress

📝 Quizzes completed: ${data.quizzes}
❓ Questions answered: ${data.questions}
✅ Correct answers: ${data.correct}
📈 Overall score: ${percentage}%

📚 Subject Progress:
`;

  for (const subject of Object.keys(data.subjects)) {
    const subjectData = data.subjects[subject];

    const subjectPercentage = Math.round(
      (subjectData.correct / subjectData.questions) * 100
    );

    message += `\n• ${subject}: ${subjectPercentage}%`;
  }

  bot.sendMessage(chatId, message);
}

/* =========================
   START COMMAND
========================= */

bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;

  delete userQuiz[chatId];

  bot.sendMessage(
    chatId,
    `👋 Welcome to StudyMate!

🎓 Your personal study assistant.`
  );

  mainMenu(chatId);
});

/* =========================
   HELP COMMAND
========================= */

bot.onText(/^\/help$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `❓ StudyMate Help

/start - Open the main menu
/help - Show help

📚 Study
📝 Quiz
📊 Progress
💡 Study Tips`
  );
});

/* =========================
   MESSAGE HANDLER
========================= */

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  if (text.startsWith("/")) return;

  /* MAIN MENU */

  if (
    text === "🏠 Main Menu" ||
    text === "🔙 Main Menu"
  ) {
    delete userQuiz[chatId];
    mainMenu(chatId);
    return;
  }

  /* STUDY */

  if (text === "📚 Study") {
    bot.sendMessage(
      chatId,
      `📚 Study Mode

Choose a subject:

Mathematics
Biology
Chemistry
Physics
Economics
Agricultural Science`
    );
    return;
  }

  /* QUIZ */

  if (text === "📝 Quiz") {
    quizMenu(chatId);
    return;
  }

  /* PROGRESS */

  if (text === "📊 Progress") {
    showProgress(chatId);
    return;
  }

  /* STUDY TIPS */

  if (text === "💡 Study Tips") {
    bot.sendMessage(
      chatId,
      `💡 Study Tip

Use active recall.

Close your notes and try to explain the topic from memory.

Then check your notes and correct what you missed. 🧠`
    );
    return;
  }

  /* HELP */

  if (text === "❓ Help") {
    bot.sendMessage(
      chatId,
      `❓ Help

Use /start to open the StudyMate menu.

You can:
📚 Study
📝 Take quizzes
📊 Track progress
💡 Get study tips`
    );
    return;
  }

  /* SUBJECT */

  if (quizzes[text]) {
    startQuiz(chatId, text);
    return;
  }

  /* QUIZ ANSWER */

  const quiz = userQuiz[chatId];

  if (quiz) {
    const question =
      quizzes[quiz.subject][quiz.currentQuestion];

    if (text === question.answer) {
      quiz.score++;

      bot.sendMessage(
        chatId,
        "✅ Correct! 🎉"
      );
    } else {
      bot.sendMessage(
        chatId,
        `❌ Incorrect.

Correct answer: ${question.answer}`
      );
    }

    quiz.currentQuestion++;

    setTimeout(() => {
      sendQuestion(chatId);
    }, 700);

    return;
  }

  /* UNKNOWN MESSAGE */

  bot.sendMessage(
    chatId,
    "🤔 I don't recognize that. Send /start."
  );
});

/* =========================
   TELEGRAM ERRORS
========================= */

bot.on("polling_error", (error) => {
  console.error(
    "Telegram polling error:",
    error.message
  );
});
