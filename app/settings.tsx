import React, { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

import {
  getVoice,
  saveVoice,
  getDarkMode,
  saveDarkMode,
} from "../utils/settings";

export default function SettingsScreen() {
  const [voice, setVoice] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      setVoice(await getVoice());
      setDarkMode(await getDarkMode());
    }

    loadSettings();
  }, []);

  const changeVoice = async (value: boolean) => {
    setVoice(value);
    await saveVoice(value);
  };

  const changeDarkMode = async (value: boolean) => {
    setDarkMode(value);
    await saveDarkMode(value);
  };

  return (
    <View
      style={[
        styles.container,
        darkMode && styles.dark,
      ]}
    >
      <Text style={styles.title}>
        ⚙️ Settings
      </Text>

      <View style={styles.row}>
        <Text style={styles.text}>
          🔊 Voice Answers
        </Text>

        <Switch
          value={voice}
          onValueChange={changeVoice}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>
          🌙 Dark Mode
        </Text>

        <Switch
          value={darkMode}
          onValueChange={changeDarkMode}
        />
      </View>

      <Text style={styles.text}>
        📚 Learning Mode: Student
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:25,
    backgroundColor:"#F1F5F9",
  },

  dark:{
    backgroundColor:"#0F172A",
  },

  title:{
    fontSize:32,
    fontWeight:"bold",
    marginBottom:30,
  },

  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:25,
  },

  text:{
    fontSize:20,
  },
});
