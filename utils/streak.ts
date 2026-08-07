import AsyncStorage from "@react-native-async-storage/async-storage";

const STREAK_KEY = "studymate_streak";
const DATE_KEY = "studymate_last_date";

export async function updateStreak() {
  const today = new Date().toDateString();

  const lastDate =
    await AsyncStorage.getItem(DATE_KEY);

  let streak =
    Number(await AsyncStorage.getItem(STREAK_KEY)) || 0;

  if (lastDate !== today) {
    if (lastDate) {
      const yesterday =
        new Date();

      yesterday.setDate(
        yesterday.getDate() - 1
      );

      if (
        lastDate ===
        yesterday.toDateString()
      ) {
        streak += 1;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }

    await AsyncStorage.setItem(
      STREAK_KEY,
      String(streak)
    );

    await AsyncStorage.setItem(
      DATE_KEY,
      today
    );
  }

  return streak;
}

export async function getStreak() {
  return (
    Number(
      await AsyncStorage.getItem(STREAK_KEY)
    ) || 0
  );
}
