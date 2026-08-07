import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { getProgress } from "../../utils/progress";
import { getStreak } from "../../utils/streak";
import { getBadges } from "../../utils/achievements";

export default function ProfileScreen() {
  const [progress, setProgress] = useState({
    xp: 0,
    level: 1,
    questionsAnswered: 0,
  });

  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      setProgress(await getProgress());
      setStreak(await getStreak());
      setBadges(await getBadges());
    }

    load();
  }, []);

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        👤 Student Profile
      </Text>

      <Text style={styles.item}>
        ⭐ XP: {progress.xp}
      </Text>

      <Text style={styles.item}>
        🏆 Level: {progress.level}
      </Text>

      <Text style={styles.item}>
        🔥 Streak: {streak} days
      </Text>

      <Text style={styles.heading}>
        🏅 Achievements
      </Text>

      {badges.length === 0 ? (
        <Text style={styles.item}>
          No badges yet. Keep studying!
        </Text>
      ) : (
        badges.map((badge, index) => (
          <Text
            key={index}
            style={styles.badge}
          >
            {badge}
          </Text>
        ))
      )}

    </ScrollView>
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
    marginBottom:30,
  },

  heading:{
    fontSize:24,
    fontWeight:"bold",
    marginTop:30,
  },

  item:{
    fontSize:20,
    marginBottom:15,
  },

  badge:{
    fontSize:22,
    marginTop:10,
  },
});
