import DeleteIconButton from "@/components/buttons/iconButtons/DeleteIconButton";
import WordPopup from "@/components/popups/WordPopup";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/context/AuthContext";
import { SITE_TITLE } from "@/data/constants";
import usePageTitle from "@/hooks/usePageTitle";
import { supabase } from "@/supabase/supabase-client";
import { handleCustomSuccessMessage } from "@/utils/bookmarkFunctions";
import { displayFormatedDate } from "@/utils/displayFormatedDate";
import { useContext, useEffect, useState } from "react";

type WordItem = {
  id: number;
  word: string;
  addedAt: string;
};

const letters = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

const Bookmarks = () => {
  const [allWords, setAllWords] = useState<WordItem[]>([]); // single source of truth
  const [words, setWords] = useState<WordItem[]>([]); // for filtering words
  const [selectedLetter, setSelectedLetter] = useState("ALL");

  const { session, profile } = useContext(AuthContext);
  usePageTitle(`Bookmarks | ${SITE_TITLE}`);

  const updateWords = (updatedWords: WordItem[]) => {
    setAllWords(updatedWords);
    setWords(updatedWords);
    localStorage.setItem("bookmarks", JSON.stringify(updatedWords));
  };

  const removeItem = async (id: number) => {
    if (session && profile) {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id)
        .eq("user_id", profile.id);
      if (!error) {
        handleCustomSuccessMessage("Word deleted successfully");
        const updated = allWords.filter((item) => item.id !== id);
        setAllWords(updated);
        setWords((prev) => prev.filter((item) => item.id !== id));
      }
    } else {
      const filteredWords = allWords.filter((item) => item.id !== id);
      updateWords(filteredWords);
    }
  };

  const removeAllItems = async () => {
    if (session && profile) {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", profile.id);
      if (!error) {
        handleCustomSuccessMessage("Words deleted successfully");
        setAllWords([]);
        setWords([]);
      }
    } else {
      updateWords([]);
    }
  };

  const fetchBookmarks = async () => {
    if (session && profile) {
      const { data, error } = await supabase
        .from("bookmarks")
        .select("id, word, created_at")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bookmarks from Supabase:", error);
      } else {
        const mapped = data.map((item) => ({
          id: item.id,
          word: item.word,
          addedAt: item.created_at,
        }));
        setAllWords(mapped);
        setWords(mapped);
      }
    } else {
      const stored = localStorage.getItem("bookmarks");
      if (stored) {
        setAllWords(JSON.parse(stored));
        setWords(JSON.parse(stored));
      }
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [session, profile]);

  useEffect(() => {
    if (selectedLetter === "ALL") {
      setWords(allWords);
    } else {
      const filtered = allWords.filter(
        (item) => item.word[0].toUpperCase() === selectedLetter
      );
      setWords(filtered);
    }
  }, [selectedLetter, allWords]);

  return (
    <main className="max-w-[1300px] mx-auto min-h-[75vh]">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-center">
        Bookmarks
      </h1>

      <section
        className={`${
          words.length > 0 ? "text-left" : "text-center"
        } mb-2 flex justify-between mt-8`}
      >
        {words.length > 0 && (
          <p className="font-bold text-xl">
            {words.length} {words.length > 1 ? "words" : "word"}
          </p>
        )}
        {words.length > 0 && <DeleteIconButton handleDelete={removeAllItems} />}
      </section>

      <hr />

      <section className="flex justify-end mt-4">
        <Select value={selectedLetter} onValueChange={setSelectedLetter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by letter" />
          </SelectTrigger>
          <SelectContent>
            {letters.map((letter) => (
              <SelectItem key={letter} value={letter}>
                {letter}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {words.length === 0 && (
        <section className="text-center py-30">
          <p className="text-xl">No bookmarked words found.</p>
          <a
            href="/story"
            className="inline-block px-6 py-3 mt-4 bg-[#1b7a1b] text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition"
          >
            Learn words now!
          </a>
        </section>
      )}

      {words.length > 0 && (
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
      )}
    </main>
  );
};

export default Bookmarks;
