import { View, Text, StyleSheet } from "react-native";

type Props = {
  text: string;
  sender: "user" | "mate";
};

export default function ChatBubble({ text, sender }: Props) {
  const isUser = sender === "user";

  return (
    <View
      style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.mateBubble,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
  },

  mateBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },

  userBubble: {
    backgroundColor: "#2563EB",
    alignSelf: "flex-end",
  },

  text: {
    fontSize: 16,
    color: "#111827",
  },
});
