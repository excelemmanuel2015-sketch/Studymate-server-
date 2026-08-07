import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getProgress } from "../utils/progress";

export default function ProgressScreen() {
  const progress = getProgress();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 My Progress</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          ⭐ XP: {progress.xp}
        </Text>

        <Text style={styles.text}>
          📚 Questions Answered: {progress.questionsAnswered}
        </Text>

        <Text style={styles.text}>
          🏆 Level: {progress.level}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 20,
  },

  text: {
    fontSize: 20,
    marginBottom: 15,
  },
});
