import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onVoice?: () => void;
};

export default function ChatInput({
  value,
  onChangeText,
  onSend,
  onVoice,
}: Props) {
  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Ask Mate..."
        value={value}
        onChangeText={onChangeText}
      />

      <TouchableOpacity
        style={styles.voice}
        onPress={onVoice}
      >
        <Text>🎤</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.send}
        onPress={onSend}
      >
        <Text style={styles.sendText}>
          ➤
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    padding:10,
    backgroundColor:"white",
    alignItems:"center",
  },

  input:{
    flex:1,
    backgroundColor:"#F1F5F9",
    padding:12,
    borderRadius:20,
  },

  voice:{
    padding:12,
    marginLeft:8,
  },

  send:{
    backgroundColor:"#2563EB",
    padding:12,
    borderRadius:20,
    marginLeft:5,
  },

  sendText:{
    color:"white",
  },
});
