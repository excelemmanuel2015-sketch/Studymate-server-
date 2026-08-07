import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getProgress } from "../../utils/progress";

export default function ProgressTab() {
  const [progress, setProgress] = useState({
    xp: 0,
    questionsAnswered: 0,
    level: 1,
  });

  useEffect(() => {
    async function loadProgress() {
      const data = await getProgress();
      setProgress(data);
    }

    loadProgress();
  }, []);

  const percent = (progress.xp % 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📊 My Progress
      </Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          🏆 Level: {progress.level}
        </Text>

        <Text style={styles.text}>
          ⭐ XP: {progress.xp}
        </Text>

        <Text style={styles.text}>
          📚 Questions: {progress.questionsAnswered}
        </Text>

        <View style={styles.bar}>
          <View
            style={[
              styles.fill,
              { width: `${percent}%` },
            ]}
          />
        </View>

        <Text>
          {percent}% to next level
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F1F5F9",
  },

  title:{
    fontSize:32,
    fontWeight:"bold",
    marginBottom:30,
  },

  card:{
    backgroundColor:"white",
    padding:25,
    borderRadius:20,
    width:"85%",
  },

  text:{
    fontSize:20,
    marginBottom:15,
  },

  bar:{
    height:15,
    backgroundColor:"#CBD5E1",
    borderRadius:10,
    overflow:"hidden",
    marginTop:10,
  },

  fill:{
    height:"100%",
    backgroundColor:"#2563EB",
  },
});
