import { displayFormatedDate } from "@/utils/displayFormatedDate";
import { isLocallyValidWord } from "@/utils/validateWord";
import React, { useEffect, useState } from "react";
import WordPopup from "./popups/WordPopup";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import DeleteIconButton from "./buttons/iconButtons/DeleteIconButton";

type WordItem = {
  id: number;
  word: string;
  addedAt: string;
};

const WordInput = ({ isOnPage = false }) => {
  const [word, setWord] = useState("");
  const [words, setWords] = useState<WordItem[]>([]);
  const [error, setError] = useState("");

  const updateWords = (updatedWords: WordItem[]) => {
    setWords(updatedWords);
    localStorage.setItem("words", JSON.stringify(updatedWords));
  };

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
    updateWords(finalWords);
    setWord("");
  };

  const removeItem = (id: number) => {
    const filteredWords = words.filter((item) => item.id !== id);
    updateWords(filteredWords);
  };

  const removeAllItems = () => {
    const filteredWords = words.filter(() => false);
    updateWords(filteredWords);
  };

  useEffect(() => {
    const stored = localStorage.getItem("words");
    if (stored) {
      setWords(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="max-w-[1300px] mx-auto min-h-[75vh]">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center">
        What did you learn recently?
      </h1>
      {error && <p className="text-center text-red-400 font-bold">{error}</p>}
      <form onSubmit={handleSubmit}>
        <section className="flex gap-2 max-w-[600px] mx-auto py-8">
          <Input
            placeholder="Enter a word that you learned recently..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <Button type="submit" disabled={!word.trim()}>
            Submit
          </Button>
        </section>
      </form>

      <section
        className={`${
          words.length > 0 ? "text-left" : "text-center"
        } mb-2 flex justify-between`}
      >
        {words.length > 0 && (
          <h3 className="font-bold text-xl">{words.length + " Words"}</h3>
        )}
        {isOnPage && words.length > 0 && (
          <DeleteIconButton handleDelete={removeAllItems} />
        )}
      </section>

      <hr />

      {words.length === 0 && (
        <section className="text-center py-30">
          <p className="text-xl">No words yet.</p>
          <a
            href="/story"
            className="inline-block px-6 py-3 mt-4 bg-[#1b7a1b] text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition"
          >
            Learn words through stories
          </a>
        </section>
      )}

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-8">
        {words?.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer">
                <CardHeader>
                  <p className="truncate font-bold" title={item.word}>
                    {item.word}
                  </p>
                  {item.addedAt && (
                    <p className="text-sm">
                      {displayFormatedDate(item.addedAt)}
                    </p>
                  )}
                </CardHeader>
              </Card>
            </DialogTrigger>
            <WordPopup
              word={item.word}
              addedAt={item.addedAt}
              handleDelete={removeItem}
              id={item.id}
            />
          </Dialog>
        ))}
      </section>
    </main>
  );
};

export default WordInput;
