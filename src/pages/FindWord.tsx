import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isLocallyValidWord } from "@/utils/validateWord";
import { useState } from "react";
import { useNavigate } from "react-router";

const FindWord = () => {
  const [searchWord, setSearchWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const { success, message } = isLocallyValidWord(searchWord);

    if (!success) {
      setErrorMessage(message || "");
      return;
    }

    navigate(`/word/${searchWord}`);
    setSearchWord("");
  };

  return (
    <main className="max-w-[1300px] mx-auto min-h-80">
      <section className="py-40">
        <h1 className="text-center text-3xl sm:text-4xl lg:text-6xl font-bold">
          Find a word...
        </h1>
        <form onSubmit={handleSubmit}>
          <section className="flex gap-2 max-w-[600px] mx-auto py-8">
            <Input
              placeholder="Yes! Type a word..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              style={{ fontSize: "90%" }}
            />
            <Button type="submit" disabled={!searchWord.trim()}>
              Submit
            </Button>
          </section>
        </form>
        {!!errorMessage && (
          <p className="text-center text-red-400 font-bold">{errorMessage}</p>
        )}
      </section>
    </main>
  );
};

export default FindWord;
