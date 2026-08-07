import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { generateQuiz } from "../../utils/aiQuiz";
import { parseQuiz } from "../../utils/quizParser";
import { addStudyXP } from "../../utils/progress";

export default function QuizScreen() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const createQuiz = async () => {
    if (!subject || !topic) return;

    const result = await generateQuiz(
      subject + " " + topic
    );

    setQuestions(parseQuiz(result));
    setCurrent(0);
    setScore(0);
    setFeedback("");
  };

  const chooseAnswer = async (option: string) => {
    const correct = questions[current].answer;

    if (
      option.includes(correct) ||
      correct.includes(option)
    ) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
      await addStudyXP(10);
    } else {
      setFeedback("❌ Wrong answer!");
    }

    setTimeout(() => {
      setFeedback("");

      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      }
    }, 1000);
  };

  if (questions.length > 0 && current < questions.length) {
    const q = questions[current];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          📝 {subject} Quiz
        </Text>

        <Text style={styles.question}>
          {q.question}
        </Text>

        {q.options.map((option: string) => (
          <TouchableOpacity
            key={option}
            style={styles.button}
            onPress={() => chooseAnswer(option)}
          >
            <Text style={styles.text}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.feedback}>
          {feedback}
        </Text>

        <Text style={styles.text}>
          Score: {score}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        🤖 AI Quiz Maker
      </Text>

      <Text style={styles.question}>
        Choose Subject
      </Text>

      {[
        "Mathematics",
        "Biology",
        "Chemistry",
        "Physics",
        "Economics",
      ].map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.button}
          onPress={() => setSubject(item)}
        >
          <Text style={styles.text}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.text}>
        Selected: {subject}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter topic"
        value={topic}
        onChangeText={setTopic}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={createQuiz}
      >
        <Text style={styles.text}>
          Generate Quiz 🚀
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:25,
    backgroundColor:"#F1F5F9",
  },

  title:{
    fontSize:30,
    fontWeight:"bold",
    marginBottom:25,
  },

  question:{
    fontSize:22,
    marginBottom:15,
  },

  input:{
    backgroundColor:"white",
    padding:15,
    borderRadius:15,
    marginTop:15,
  },

  button:{
    backgroundColor:"white",
    padding:15,
    borderRadius:15,
    marginTop:10,
  },

  text:{
    fontSize:18,
  },

  feedback:{
    fontSize:22,
    marginTop:20,
  },
});
