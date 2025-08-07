import BookmarkIconButton from "@/components/buttons/iconButtons/BookmarkIconButton";
import WordDataLoading from "@/components/loading/WordDataLoading";
import MeaningNotFound from "@/components/text/MeaningNotFound";
import WordDeepMeanings from "@/components/words/WordDeepMeanings";
import { SITE_TITLE } from "@/data/constants";
import useFetchWordMeaning from "@/hooks/useFetchWordMeaning";
import type { BookmarkWordProps } from "@/types";
import {
  handleFailureMessage,
  handleSuccessMessage,
} from "@/utils/bookmarkFunctions";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const Word = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkWordProps[]>([]);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { title } = useParams();
  const { data, isFetching } = useFetchWordMeaning(title ?? "");

  useEffect(() => {
    document.title = `${title} | ${SITE_TITLE}`;
  }, [title]);

  useEffect(() => {
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
  }, []);

  const handleBookmarking = () => {
    if (title) {
      const find = bookmarks.find((item) => item.word.toLowerCase() === title);

      if (find) {
        const newBookmarks = bookmarks.filter((item) => item.word !== title);

        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
        setBookmarks(newBookmarks);
        setIsBookmarked(false);

        toast.success("Word is removed from bookmarks.");
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
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
        setBookmarks(newBookmarks);
        setIsBookmarked(true);
        handleSuccessMessage();
      } catch (error) {
        console.error("Error saving bookmarks:", error);
        setIsBookmarked(false);
        handleFailureMessage();
      }
    } else {
      handleFailureMessage();
      setIsBookmarked(false);
      return;
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
