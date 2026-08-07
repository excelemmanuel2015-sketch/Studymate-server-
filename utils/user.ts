import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "studymate_user";

export async function setUser(name: string) {
  await AsyncStorage.setItem(USER_KEY, name);
}

export async function getUser() {
  const user = await AsyncStorage.getItem(USER_KEY);
  return user || "Guest";
}
