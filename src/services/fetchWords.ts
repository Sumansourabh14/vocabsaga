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

export type DictionaryEntry = {
  word: string;
  phonetic?: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  origin?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
};

export const fetchMeaningOfWord = async (
  word: string
): Promise<DictionaryEntry[]> => {
  const res = await fetch(`${WORDS_API_URL}/${word}`);

  if (!res.ok) {
    throw new Error(`Could not fetch definitions (status ${res.status})`);
  }

  const data = await res.json();
  return data;
};
