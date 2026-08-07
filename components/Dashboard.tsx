import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  xp: number;
  level: number;
  streak: number;
};

export default function Dashboard({
  xp,
  level,
  streak,
}: Props) {
  return (
    <View style={styles.card}>

      <Text style={styles.title}>
        📚 StudyMate Dashboard
      </Text>

      <Text style={styles.text}>
        ⭐ XP: {xp}
      </Text>

      <Text style={styles.text}>
        🏆 Level: {level}
      </Text>

      <Text style={styles.text}>
        🔥 Streak: {streak} days
      </Text>

      <Text style={styles.goal}>
        🎯 Daily Goal: Keep learning!
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card:{
    backgroundColor:"white",
    padding:20,
    margin:15,
    borderRadius:20,
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    marginBottom:15,
  },

  text:{
    fontSize:18,
    marginBottom:8,
  },

  goal:{
    marginTop:10,
    fontSize:16,
  },
});
