import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AuthContext } from "@/context/AuthContext";
import { SITE_TITLE } from "@/data/constants";
import rawPassages from "@/data/passages/p2.json";
import usePageTitle from "@/hooks/usePageTitle";
import { supabase } from "@/supabase/supabase-client";
import type { BookmarkWordProps, WordPassage } from "@/types";
import {
  handleFailureMessage,
  handleSuccessMessage,
} from "@/utils/bookmarkFunctions";
import { Bookmark, Eye, Shuffle } from "lucide-react";
import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const passages: WordPassage[] = rawPassages;

const getBadgeColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-orange-100 text-orange-800";
    case "hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RandomStory = () => {
  const [bookmarks, setBookmarks] = useState<BookmarkWordProps[]>([]);
  const [current, setCurrent] = useState(
    Math.floor(Math.random() * passages.length)
  );
  const [wordLimit, setWordLimit] = useState("15");
  const { session, profile } = useContext(AuthContext);
  const data = passages[current];
  usePageTitle(`Story | ${SITE_TITLE}`);

  const handleRandom = () => {
    if (passages.length === 0) return;

    const randomIndex = Math.floor(Math.random() * passages.length);
    setCurrent(randomIndex);
  };

  // const handlePrevious = () => {
  //   setCurrent((prev) => (prev === 0 ? passages.length - 1 : prev - 1));
  // };

  // const handleNext = () => {
  //   setCurrent((prev) => (prev === passages.length - 1 ? 0 : prev + 1));
  // };

  // const fetchGeminiData = async () => {
  //   const content = `Give me a passage in Engligh for vocabulary. It should have a focused word.
  //   difficulty_level can be either easy, medium or hard. You decide.

  //   Give me the data in this format:
  //   {
  //     "id",
  //     "word",
  //     "word_meaning",
  //     "difficulty_level",
  //     "passages": {
  //       "  ",
  //       "25"
  //     }
  //   }

  //   10 means, limit: 10 words
  //   25 means, limit: 25 words
  //   Don't bold the word. Keep it normal. Give me the JSON object only. I will parse it with JSON.parse() method. No other text in response, please.

  //   `;

  //   const res = (await geminiAI(content)) || "";
  //   console.log(res, JSON.parse(res));

  //   return res;
  // };

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");

    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
        setBookmarks([]);
      }
    }
  }, []);

  const handleSaveWord = async () => {
    if (!data.word) {
      handleFailureMessage();
      return;
    }

    if (session && profile) {
      try {
        const { error } = await supabase.from("bookmarks").insert([
          {
            user_id: profile.id,
            word: data.word,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
        handleSuccessMessage();
      } catch (error) {
        console.error("Error updating bookmark in DB:", error);
        handleFailureMessage();
      }
    } else {
      const find = bookmarks.find(
        (item) => item.word.toLowerCase() === data.word
      );

      if (find) {
        toast.error("Word is already bookmarked.");
        return;
      }

      const newBookmarks = [
        ...bookmarks,
        {
          id: Date.now().toString(),
          word: data.word,
          addedAt: new Date().toISOString(),
        },
      ];

      try {
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
        setBookmarks(newBookmarks);
        handleSuccessMessage();
      } catch (error) {
        console.error("Error saving bookmarks:", error);
        handleFailureMessage();
      }
    }
  };

  const highlightWordInPassage = (text: string, word: string) => {
    const base = word.toLowerCase();
    const forms = [
      base,
      `${base}s`,
      `${base}es`,
      `${base}d`,
      `${base}ed`,
      `${base}ing`,
      base.endsWith("e") ? `${base.slice(0, -1)}ing` : "",
      base.endsWith("e") ? `${base}d` : "",
    ].filter((form): form is string => !!form); // Type guard to ensure string

    const escapedForms = forms.map((w) =>
      w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    );
    const regex = new RegExp(`\\b(${escapedForms.join("|")})\\b`, "gi");

    return text.split(regex).map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className="text-lime-600 font-bold">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <section className="max-w-[1300px] mx-auto px-8 min-h-[75vh] flex items-center justify-center">
      <section className="max-w-5xl mx-auto text-center space-y-4">
        <section className="flex justify-center items-center gap-4">
          <div>
            <Badge className={`${getBadgeColor(data.difficulty_level)}`}>
              {data.difficulty_level.toUpperCase()}
            </Badge>
          </div>

          <ToggleGroup
            type="single"
            variant="outline"
            value={wordLimit}
            onValueChange={(value) => {
              if (value) setWordLimit(value);
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value={"15"}
                  aria-label="Toggle 15"
                  className="cursor-pointer px-4"
                >
                  Short
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>15 words</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value={"30"}
                  aria-label="Toggle 30"
                  className="cursor-pointer px-4"
                >
                  Detailed
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>30 words</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </section>

        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl playfair-display-normal"
          key={data.word}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {highlightWordInPassage(data.passages[wordLimit], data.word)}
        </motion.h1>

        {(data.source_book || data.source_author) && (
          <p className="text-sm text-gray-400 italic">
            — {data.source_book}
            {data.source_author ? ` by ${data.source_author}` : ""}
          </p>
        )}

        <section className="flex gap-4 justify-center mt-8">
          {/* <Button
            variant={"outline"}
            onClick={handlePrevious}
            className="cursor-pointer"
          >
            Previous
          </Button> */}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                onClick={handleRandom}
                className="cursor-pointer"
              >
                <Shuffle />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Shuffle passage</p>
            </TooltipContent>
          </Tooltip>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="default" className="cursor-pointer">
                <Eye /> Show Meaning
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-3xl">{data.word}</DrawerTitle>
                <DrawerDescription className="text-xl">
                  {data.word_meaning}
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          {/* <Button
            variant={"outline"}
            onClick={handleNext}
            className="cursor-pointer"
          >
            Next
          </Button> */}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                onClick={handleSaveWord}
                className="cursor-pointer"
              >
                <Bookmark />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add word to bookmark</p>
            </TooltipContent>
          </Tooltip>
        </section>
      </section>
    </section>
  );
};

export default RandomStory;
