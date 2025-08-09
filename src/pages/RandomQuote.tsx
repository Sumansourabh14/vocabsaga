import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SITE_TITLE } from "@/data/constants";
import usePageTitle from "@/hooks/usePageTitle";
import { fetchRandomQuote } from "@/services/fetchQuotes";
import type { Quote } from "@/types";
import { Maximize, Minimize, Shuffle } from "lucide-react";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const firstQuote: Quote = {
  _id: "6640a798e14c6532bcfb00c6",
  quote:
    "Only people who have been discriminated against can really know how much it hurts.",
  book: "Kafka on the Shore",
  author: "Haruki Murakami",
};

const RandomQuote = () => {
  const [data, setData] = useState(firstQuote);
  const handle = useFullScreenHandle();
  usePageTitle(`Quote | ${SITE_TITLE}`);

  const handleRandom = async () => {
    const res = await fetchRandomQuote();

    if (res) {
      setData(res);
    }
  };

  return (
    <FullScreen handle={handle} className="random-story flex items-center">
      <section className="max-w-[1300px] mx-auto px-8 py-32 2xl:py-40 flex items-center justify-center">
        <section className="max-w-5xl mx-auto text-center space-y-4">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl playfair-display-normal">
            &quot;{data.quote}&quot;
          </h1>

          {(data.book || data.author) && (
            <p className="text-sm text-muted-foreground">
              — <strong>{data.book}</strong>
              {data.author ? `, ${data.author}` : ""}
            </p>
          )}

          <section className="flex gap-4 justify-center mt-8">
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
                <p>Shuffle quote</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  onClick={handle.active ? handle.exit : handle.enter}
                  className="cursor-pointer"
                >
                  {handle.active ? <Minimize /> : <Maximize />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {handle.active ? "Exit fullscreen" : "Enter fullscreen"}
              </TooltipContent>
            </Tooltip>
          </section>
        </section>
      </section>
    </FullScreen>
  );
};

export default RandomQuote;
