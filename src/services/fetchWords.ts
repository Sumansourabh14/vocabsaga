import { WORDS_API_URL, wordsUrls } from "@/data/constants";

export const fetchRandomWord = async () => {
  try {
    const res = await fetch(wordsUrls.randomWord);
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error(error);
  }
};

export const fetchMeaningOfWord = async (word: string) => {
  try {
    const res = await fetch(`${WORDS_API_URL}/${word}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
