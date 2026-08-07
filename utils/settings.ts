import AsyncStorage from "@react-native-async-storage/async-storage";

const VOICE_KEY = "studymate_voice";
const DARK_KEY = "studymate_dark";

export async function saveVoice(value: boolean) {
  await AsyncStorage.setItem(
    VOICE_KEY,
    JSON.stringify(value)
  );
}

export async function getVoice() {
  const value = await AsyncStorage.getItem(VOICE_KEY);
  return value === null ? true : JSON.parse(value);
}

export async function saveDarkMode(value: boolean) {
  await AsyncStorage.setItem(
    DARK_KEY,
    JSON.stringify(value)
  );
}

export async function getDarkMode() {
  const value = await AsyncStorage.getItem(DARK_KEY);
  return value === null ? false : JSON.parse(value);
}
