import React, { useEffect, useState } from "react";

type WordItem = {
  id: number;
  word: string;
};

const WordInput = () => {
  const [word, setWord] = useState("");
  const [words, setWords] = useState<WordItem[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (words.some((item) => item.word === word.trim())) {
      setError("Oops! You have already added this word");
      return;
    }

    const payload = {
      id: Date.now(),
      word,
    };

    const finalWords = [...words, payload];
    setWords(finalWords);

    localStorage.setItem("words", JSON.stringify(finalWords));
    setWord("");
  };

  useEffect(() => {
    const stored = localStorage.getItem("words");
    if (stored) {
      setWords(JSON.parse(stored));
    }
  }, []);

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter a word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit" disabled={!word.trim()}>
          Submit
        </button>
      </form>

      <div>
        {words?.map((item) => (
          <div key={item.id}>
            <p>{item.word}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WordInput;
