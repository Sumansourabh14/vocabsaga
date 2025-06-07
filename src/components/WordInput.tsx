import { useEffect, useState } from "react";

const WordInput = () => {
  const [word, setWord] = useState("");
  const [words, setWords] = useState([]);
  const [updatedWords, setUpdatedWords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: Date.now(),
      word,
    };

    const finalWords = [...words, payload];
    setWords(finalWords);

    localStorage.setItem("words", JSON.stringify(finalWords));
  };

  useEffect(() => {
    const storedWords = localStorage.getItem("words");
    const data = JSON.parse(storedWords);
    setUpdatedWords(data);
  }, [words]);

  return (
    <>
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
        {updatedWords?.map((word) => (
          <div key={word.id}>
            <p>{word.word}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WordInput;
