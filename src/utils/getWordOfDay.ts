import words from "@/data/words/moderate_words.json";

export const getWordOfTheDay = () => {
  const today = new Date();
  const daySeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate(); // eg. 20250719
  const index = daySeed % words.words.length;
  return words.words[index];
};
