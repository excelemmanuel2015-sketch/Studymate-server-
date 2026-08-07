import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import Dashboard from "../../components/Dashboard";
import Header from "../../components/Header";
import ChatBubble from "../../components/ChatBubble";
import ChatInput from "../../components/ChatInput";

import { getProgress, addStudyXP } from "../../utils/progress";
import { updateStreak } from "../../utils/streak";
import { checkBadges } from "../../utils/achievements";
import { askAI } from "../../utils/ai";
import { speak } from "../../utils/voice";

export default function HomeScreen() {
  const [progress, setProgress] = useState({
    xp: 0,
    level: 1,
    questionsAnswered: 0,
  });

  const [streak, setStreak] = useState(1);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "mate" as const,
      text: "👋 Welcome to StudyMate! Let's learn today.",
    },
  ]);

  useEffect(() => {
    async function load() {
      setProgress(await getProgress());

      const currentStreak = await updateStreak();
      setStreak(currentStreak);
    }

    load();
  }, []);

  const send = async () => {
    if (!message.trim()) return;

    const question = message;
    setMessage("");

    setMessages((old) => [
      ...old,
      {
        sender: "user" as const,
        text: question,
      },
      {
        sender: "mate" as const,
        text: "🤔 Thinking...",
      },
    ]);

    await addStudyXP(5);

    const updatedProgress = await getProgress();

    await checkBadges(
      updatedProgress.xp,
      streak,
      updatedProgress.questionsAnswered
    );

    const answer = await askAI(question);

    speak(answer);

    setMessages((old) => [
      ...old.slice(0, -1),
      {
        sender: "mate" as const,
        text: answer,
      },
    ]);

    setProgress(await getProgress());
  };

  return (
    <View style={styles.container}>
      <Header />

      <Dashboard
        xp={progress.xp}
        level={progress.level}
        streak={streak}
      />

      <ScrollView style={styles.chat}>
        {messages.map((item, index) => (
          <ChatBubble
            key={index}
            sender={item.sender}
            text={item.text}
          />
        ))}
      </ScrollView>

      <ChatInput
        value={message}
        onChangeText={setMessage}
        onSend={send}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  chat: {
    flex: 1,
    padding: 10,
  },
});
