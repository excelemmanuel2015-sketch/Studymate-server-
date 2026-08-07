import AsyncStorage from "@react-native-async-storage/async-storage";

const XP_KEY = "studymate_xp";
const LEVEL_KEY = "studymate_level";
const QUESTIONS_KEY = "studymate_questions";

export async function addStudyXP(amount: number) {
  let xp =
    Number(await AsyncStorage.getItem(XP_KEY)) || 0;

  let questions =
    Number(await AsyncStorage.getItem(QUESTIONS_KEY)) || 0;

  xp += amount;
  questions += 1;

  let level = Math.floor(xp / 100) + 1;

  await AsyncStorage.setItem(
    XP_KEY,
    String(xp)
  );

  await AsyncStorage.setItem(
    LEVEL_KEY,
    String(level)
  );

  await AsyncStorage.setItem(
    QUESTIONS_KEY,
    String(questions)
  );
}

export async function getProgress() {
  const xp =
    Number(await AsyncStorage.getItem(XP_KEY)) || 0;

  const level =
    Number(await AsyncStorage.getItem(LEVEL_KEY)) || 1;

  const questionsAnswered =
    Number(await AsyncStorage.getItem(QUESTIONS_KEY)) || 0;

  return {
    xp,
    level,
    questionsAnswered,
  };
}
