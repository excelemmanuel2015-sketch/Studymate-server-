import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Mate() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        🤖 StudyMate AI
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },

  text:{
    fontSize:25,
    fontWeight:"bold",
  },
});
