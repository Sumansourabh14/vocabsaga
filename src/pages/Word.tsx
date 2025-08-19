import BookmarkIconButton from "@/components/buttons/iconButtons/BookmarkIconButton";
import WordDataLoading from "@/components/loading/WordDataLoading";
import MeaningNotFound from "@/components/text/MeaningNotFound";
import WordDeepMeanings from "@/components/words/WordDeepMeanings";
import { AuthContext } from "@/context/AuthContext";
import { SITE_TITLE } from "@/data/constants";
import useFetchWordMeaning from "@/hooks/useFetchWordMeaning";
import { supabase } from "@/supabase/supabase-client";
import type { BookmarkWordProps } from "@/types";
import {
  addBookmarksToLocalStorage,
  handleFailureMessage,
  handleRemovedSuccessMessage,
  handleSuccessMessage,
} from "@/utils/bookmarkFunctions";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

const Word = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkWordProps[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { title } = useParams();
  const { data, isFetching } = useFetchWordMeaning(title ?? "");
  const { session, profile } = useContext(AuthContext);

  useEffect(() => {
    document.title = `${title} | ${SITE_TITLE}`;
  }, [title]);

  const fetchBookmarksOnMount = async () => {
    const { error } = await supabase
      .from("bookmarks")
      .select()
      .eq("word", title)
      .eq("user_id", profile?.id);

    if (error) {
      setIsBookmarked(false);
    } else {
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    if (session && profile) {
      fetchBookmarksOnMount();
    } else {
      const savedBookmarks = localStorage.getItem("bookmarks");

      if (savedBookmarks) {
        try {
          setBookmarks(JSON.parse(savedBookmarks));

          const find = JSON.parse(savedBookmarks).find(
            (item: BookmarkWordProps) => item.word.toLowerCase() === title
          );

          if (find) {
            setIsBookmarked(true);
          } else {
            setIsBookmarked(false);
          }
        } catch (error) {
          console.error("Error parsing bookmarks:", error);
          setBookmarks([]);
        }
      }
    }
  }, [session, profile]);

  const handleSetLocalStorage = (newBookmarks: BookmarkWordProps[]) => {
    addBookmarksToLocalStorage(newBookmarks);
    setBookmarks(newBookmarks);
  };

  const handleBookmarking = async () => {
    if (!title) {
      handleFailureMessage();
      setIsBookmarked(false);
      return;
    }

    if (session && profile) {
      try {
        if (isBookmarked) {
          const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("user_id", profile.id)
            .eq("word", title);

          if (error) throw error;

          setIsBookmarked(false);
          handleRemovedSuccessMessage();
        } else {
          const { error } = await supabase.from("bookmarks").insert([
            {
              user_id: profile.id,
              word: title,
              created_at: new Date().toISOString(),
            },
          ]);

          if (error) throw error;

          setIsBookmarked(true);
          handleSuccessMessage();
        }
      } catch (error) {
        console.error("Error updating bookmark in DB:", error);
        handleFailureMessage();
      }
    } else {
      const find = bookmarks.find((item) => item.word.toLowerCase() === title);

      if (find) {
        const newBookmarks = bookmarks.filter((item) => item.word !== title);

        handleSetLocalStorage(newBookmarks);
        setIsBookmarked(false);

        handleRemovedSuccessMessage();
        return;
      }

      const newBookmarks = [
        ...bookmarks,
        {
          id: Date.now().toString(),
          word: title,
          addedAt: new Date().toISOString(),
        },
      ];

      try {
        handleSetLocalStorage(newBookmarks);
        setIsBookmarked(true);
        handleSuccessMessage();
      } catch (error) {
        console.error("Error saving bookmarks:", error);
        setIsBookmarked(false);
        handleFailureMessage();
      }
    }
  };

  return (
    <section className="max-w-[1300px] mx-auto min-h-[70vh] pt-12 pb-20 relative">
      <h1 className="text-center text-5xl sm:text-8xl lg:text-9xl font-bold break-all">
        {title}
      </h1>
      <section className="absolute top-0 right-8">
        <BookmarkIconButton
          handleBookmark={handleBookmarking}
          isBookmarked={isBookmarked}
        />
      </section>

      {isFetching ? (
        <WordDataLoading />
      ) : data !== undefined ? (
        data.map((word, index) => (
          <WordDeepMeanings
            key={index}
            meanings={word.meanings}
            phonetics={word.phonetics}
            origin={word.origin}
            phonetic={word.phonetic}
          />
        ))
      ) : (
        <MeaningNotFound />
      )}
    </section>
  );
};

export default Word;
