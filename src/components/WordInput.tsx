import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { displayFormatedDate } from "@/utils/displayFormatedDate";
import { isLocallyValidWord } from "@/utils/validateWord";

type WordItem = {
  id: number;
  word: string;
  addedAt: string;
};

const WordInput = () => {
  const [word, setWord] = useState("");
  const [words, setWords] = useState<WordItem[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { success, message } = isLocallyValidWord(word);

    if (!success) {
      setError(message || "");
      return;
    }

    if (words.some((item) => item.word === word.trim())) {
      setError("Oops! You have already added this word");
      return;
    }

    const payload = {
      id: Date.now(),
      word,
      addedAt: new Date().toISOString(),
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
        <Input
          placeholder="Enter a word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Button type="submit" disabled={!word.trim()}>
          Submit
        </Button>
      </form>

      <section className="grid grid-cols-5 gap-4 py-8">
        {words?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <p className="truncate font-bold" title={item.word}>
                {item.word}
              </p>
              {item.addedAt && (
                <p className="text-sm">{displayFormatedDate(item.addedAt)}</p>
              )}
            </CardHeader>
          </Card>
        ))}
      </section>
    </>
  );
};

export default WordInput;
