import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import passage from "@/data/passages/p1.json";
import { useState } from "react";

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
  const [showMeaning, setShowMeaning] = useState(false);
  const [current, setCurrent] = useState(0);
  const data = passage[current];

  const handlePrevious = () => {
    setCurrent((prev) => (prev === 0 ? passage.length - 1 : prev - 1));
    setShowMeaning(false);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === passage.length - 1 ? 0 : prev + 1));
    setShowMeaning(false);
  };

  return (
    <main className="max-w-[1300px] mx-auto min-h-80 px-8">
      <section className="py-20 max-w-4xl mx-auto text-center space-y-4">
        <Progress value={((current + 1) / passage.length) * 100} />

        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
            data.difficulty_level
          )}`}
        >
          {data.difficulty_level.toUpperCase()}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-6xl">{data.passage}</h1>
        {(data.source_book || data.source_author) && (
          <p className="text-sm text-gray-400 italic">
            — {data.source_book}
            {data.source_author ? ` by ${data.source_author}` : ""}
          </p>
        )}
        <div className="space-y-2 pt-6">
          <p className="text-lg font-semibold">Word: {data.word}</p>

          {showMeaning && (
            <p className="text-base text-gray-700">
              <span className="font-semibold">Meaning:</span>{" "}
              {data.word_meaning}
            </p>
          )}
        </div>

        <section className="flex gap-4 justify-center">
          <Button
            variant={"outline"}
            onClick={handlePrevious}
            className="cursor-pointer"
          >
            Previous
          </Button>

          <Button
            variant={"default"}
            onClick={() => setShowMeaning(!showMeaning)}
            className="cursor-pointer"
          >
            {showMeaning ? "Hide Meaning" : "Show meaning"}
          </Button>

          <Button
            variant={"outline"}
            onClick={handleNext}
            className="cursor-pointer"
          >
            Next
          </Button>
        </section>
      </section>
    </main>
  );
};

export default RandomStory;
