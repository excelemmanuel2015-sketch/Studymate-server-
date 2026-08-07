import AsyncStorage from "@react-native-async-storage/async-storage";

const BADGES_KEY = "studymate_badges";

export async function checkBadges(
  xp: number,
  streak: number,
  questions: number
) {
  let badges =
    JSON.parse(
      (await AsyncStorage.getItem(BADGES_KEY)) || "[]"
    );

  const newBadges = [];

  if (questions >= 1 && !badges.includes("🌱 First Step")) {
    newBadges.push("🌱 First Step");
  }

  if (xp >= 50 && !badges.includes("📚 Learner")) {
    newBadges.push("📚 Learner");
  }

  if (streak >= 7 && !badges.includes("🔥 Dedicated")) {
    newBadges.push("🔥 Dedicated");
  }

  if (xp >= 500 && !badges.includes("🧠 Scholar")) {
    newBadges.push("🧠 Scholar");
  }

  badges = [...badges, ...newBadges];

  await AsyncStorage.setItem(
    BADGES_KEY,
    JSON.stringify(badges)
  );

  return badges;
}

export async function getBadges() {
  return JSON.parse(
    (await AsyncStorage.getItem(BADGES_KEY)) || "[]"
  );
}
