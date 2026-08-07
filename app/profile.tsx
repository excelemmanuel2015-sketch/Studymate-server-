import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getUser } from "../utils/user";

export default function ProfileScreen() {
  const user = getUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        👤 Profile
      </Text>

      <Text style={styles.text}>
        Student: {user || "Guest"}
      </Text>
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
  },

  text:{
    fontSize:20,
    marginTop:20,
  },
});
