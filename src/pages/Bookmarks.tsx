import DeleteIconButton from "@/components/buttons/iconButtons/DeleteIconButton";
import WordPopup from "@/components/popups/WordPopup";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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

const Bookmarks = () => {
  const [words, setWords] = useState<WordItem[]>([]);
  const { session, profile } = useContext(AuthContext);
  usePageTitle(`Bookmarks | ${SITE_TITLE}`);

  const updateWords = (updatedWords: WordItem[]) => {
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
        setWords(words.filter((item) => item.id !== id));
      }
    } else {
      const filteredWords = words.filter((item) => item.id !== id);
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
        setWords([]);
      }
    } else {
      const filteredWords = words.filter(() => false);
      updateWords(filteredWords);
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
        setWords(
          data.map((item) => ({
            id: item.id,
            word: item.word,
            addedAt: item.created_at,
          }))
        );
      }
    } else {
      const stored = localStorage.getItem("bookmarks");
      if (stored) {
        setWords(JSON.parse(stored));
      }
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [session, profile]);

  return (
    <main className="max-w-[1300px] mx-auto min-h-[75vh]">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center">
        Bookmarks
      </h1>

      <section
        className={`${
          words.length > 0 ? "text-left" : "text-center"
        } mb-2 flex justify-between`}
      >
        {words.length > 0 && (
          <p className="font-bold text-xl">
            {words.length} {words.length > 1 ? "words" : "word"}
          </p>
        )}
        {words.length > 0 && <DeleteIconButton handleDelete={removeAllItems} />}
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
