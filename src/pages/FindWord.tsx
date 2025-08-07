import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_TITLE } from "@/data/constants";
import usePageTitle from "@/hooks/usePageTitle";
import { isLocallyValidWord } from "@/utils/validateWord";
import { useState } from "react";
import { useNavigate } from "react-router";

const FindWord = () => {
  const [searchWord, setSearchWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  usePageTitle(`Find a word | ${SITE_TITLE}`);

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
    <main className="max-w-[1300px] mx-auto min-h-[75vh]">
      <section className="py-20">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center">
          Find a word...
        </h1>
        <form onSubmit={handleSubmit}>
          <section className="flex gap-2 max-w-[600px] mx-auto py-8">
            <Input
              placeholder="Type a word..."
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
