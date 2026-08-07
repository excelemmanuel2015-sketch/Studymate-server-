import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 StudyMate</Text>
      <Text style={styles.subtitle}>Your AI Study Assistant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2563EB",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#DBEAFE",
    fontSize: 16,
    marginTop: 4,
  },
});
