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
import rawPassages from "@/data/passages/p1.json";
import type { BookmarkWordProps, WordPassage } from "@/types";
import { useEffect, useState } from "react";

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
  const [current, setCurrent] = useState(0);
  const data = passages[current];

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? passages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === passages.length - 1 ? 0 : prev + 1));
  };

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

  const handleSaveWord = () => {
    const newBookmarks = [
      ...bookmarks,
      {
        id: Date.now().toString(),
        word: data.word,
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
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
    <main className="max-w-[1300px] mx-auto px-8">
      <section className="py-20 lg:py-30 2xl:py-50 max-w-4xl mx-auto text-center space-y-4">
        {/* <Progress value={((current + 1) / passage.length) * 100} /> */}

        <Badge
          className={`px-2 text-sm ${getBadgeColor(data.difficulty_level)}`}
        >
          {data.difficulty_level.toUpperCase()}
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl eb-garamond-normal">
          {highlightWordInPassage(data.passage, data.word)}
        </h1>

        {(data.source_book || data.source_author) && (
          <p className="text-sm text-gray-400 italic">
            — {data.source_book}
            {data.source_author ? ` by ${data.source_author}` : ""}
          </p>
        )}

        <section className="flex gap-4 justify-center mt-8">
          <Button
            variant={"outline"}
            onClick={handlePrevious}
            className="cursor-pointer"
          >
            Previous
          </Button>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="default" className="cursor-pointer">
                Show Meaning
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

          <Button
            variant={"outline"}
            onClick={handleNext}
            className="cursor-pointer"
          >
            Next
          </Button>
        </section>
        <section>
          <Button
            variant={"outline"}
            onClick={handleSaveWord}
            className="cursor-pointer"
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default RandomStory;
