import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { setUser } from "../utils/user";
import { router } from "expo-router";

export default function LoginScreen() {
  const [name, setName] = useState("");

  const login = async () => {
    if (!name.trim()) return;

    await setUser(name);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🤖 StudyMate
      </Text>

      <Text style={styles.subtitle}>
        Enter your name to start learning
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={login}
      >
        <Text style={styles.buttonText}>
          Start Learning
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#2563EB",
    padding:20,
  },

  title:{
    color:"white",
    fontSize:36,
    fontWeight:"bold",
    marginBottom:10,
  },

  subtitle:{
    color:"white",
    marginBottom:30,
  },

  input:{
    backgroundColor:"white",
    width:"90%",
    padding:15,
    borderRadius:12,
    marginBottom:15,
  },

  button:{
    backgroundColor:"#0F172A",
    padding:15,
    width:"90%",
    borderRadius:12,
    alignItems:"center",
  },

  buttonText:{
    color:"white",
    fontSize:18,
    fontWeight:"bold",
  },
});
