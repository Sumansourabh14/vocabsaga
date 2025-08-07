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
    <div className="space-y-6 my-6">
      {/* Phonetic */}
      {phonetic && <p className="text-gray-600 text-lg">/{phonetic}/</p>}

      {/* Audio pronunciation */}
      {phonetics?.map((p, index) =>
        p.audio ? (
          <div key={index} className="flex items-center gap-2">
            {p.text && (
              <span className="italic text-sm text-gray-500">[{p.text}]</span>
            )}
            <audio controls src={p.audio} className="mt-1" />
          </div>
        ) : null
      )}

      {/* Origin */}
      {origin && (
        <div>
          <h2 className="font-semibold">Origin</h2>
          <p className="text-sm text-gray-700">{origin}</p>
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
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Example:</strong> "{def.example}"
                    </p>
                  )}

                  {(def.synonyms.length > 0 || def.antonyms.length > 0) && (
                    <div className="text-sm text-gray-500 mt-1">
                      {def.synonyms.length > 0 && (
                        <p>
                          <strong>Synonyms:</strong> {def.synonyms.join(", ")}
                        </p>
                      )}
                      {def.antonyms.length > 0 && (
                        <p>
                          <strong>Antonyms:</strong> {def.antonyms.join(", ")}
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
