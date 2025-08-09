import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";

type WordDeepMeaningsProps = {
  phonetic?: string;
  phonetics: {
    text?: string;
    audio?: string;
  }[];
  origin?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
};

const WordDeepMeanings = ({
  phonetic,
  phonetics,
  origin,
  meanings,
}: WordDeepMeaningsProps) => {
  return (
    <div className="space-y-6 my-12 max-w-2xl mx-auto">
      {/* Phonetic */}
      {phonetic && (
        <p className="text-muted-foreground text-lg">/{phonetic}/</p>
      )}

      {/* Audio pronunciation */}
      {phonetics?.map((p, index) =>
        p.audio ? (
          <div key={index} className="flex items-center gap-2">
            {p.text && (
              <span className="italic text-sm text-muted-foreground">
                [{p.text}]
              </span>
            )}
            <Button
              variant="outline"
              className="h-10 w-10 cursor-pointer"
              onClick={() => {
                const audio = new Audio(p.audio);
                audio
                  .play()
                  .catch((err) => console.error("Audio playback error:", err));
              }}
              aria-label="Play pronunciation"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        ) : null
      )}

      {/* Origin */}
      {origin && (
        <div>
          <h2 className="font-semibold">Origin</h2>
          <p className="text-sm text-muted-foreground">{origin}</p>
        </div>
      )}

      {/* Meanings */}
      <div className="space-y-4">
        {meanings.map((meaning, index) => (
          <div key={index}>
            <p className="text-lg font-semibold italic">
              {meaning.partOfSpeech}
            </p>

            <ol className="list-decimal list-inside space-y-2 mt-1">
              {meaning.definitions.map((def, i) => (
                <li key={i}>
                  <p>{def.definition}</p>

                  {def.example && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Example:</strong> "{def.example}"
                    </p>
                  )}

                  {(def.synonyms.length > 0 || def.antonyms.length > 0) && (
                    <div className="text-sm text-muted-foreground mt-4 space-y-4">
                      {def.synonyms.length > 0 && (
                        <p>
                          <strong>Similar: </strong>
                          {def.synonyms.map((syn) => (
                            <Badge
                              asChild
                              key={syn}
                              className="mr-2"
                              variant={"secondary"}
                            >
                              <Link to={`/word/${syn}`}>{syn}</Link>
                            </Badge>
                          ))}
                        </p>
                      )}
                      {def.antonyms.length > 0 && (
                        <p>
                          <strong>Opposite: </strong>
                          {def.antonyms.map((ant) => (
                            <Badge
                              asChild
                              key={ant}
                              className="mr-2"
                              variant={"secondary"}
                            >
                              <Link to={`/word/${ant}`}>{ant}</Link>
                            </Badge>
                          ))}
                        </p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordDeepMeanings;
