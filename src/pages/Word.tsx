import useFetchWordMeaning from "@/hooks/useFetchWordMeaning";
import { useParams } from "react-router";

const Word = () => {
  const { title } = useParams();

  const { data, isFetching } = useFetchWordMeaning(title ?? "");
  console.log({ data, isFetching });

  return (
    <section className="max-w-[1300px] mx-auto">
      <h1 className="text-center text-5xl sm:text-8xl lg:text-9xl font-bold">
        {title}
      </h1>

      {isFetching ? (
        <p className="text-center text-gray-400 text-xl pt-10">
          Trying to lookup this word...
        </p>
      ) : data !== undefined ? (
        data.map((word, index) => (
          <div className="space-y-6 my-6" key={index}>
            {/* Phonetic */}
            {word.phonetic && (
              <p className="text-gray-600 text-lg">/{word.phonetic}/</p>
            )}

            {/* Audio pronunciation */}
            {word.phonetics?.map((p, index) =>
              p.audio ? (
                <div key={index} className="flex items-center gap-2">
                  {p.text && (
                    <span className="italic text-sm text-gray-500">
                      [{p.text}]
                    </span>
                  )}
                  <audio controls src={p.audio} className="mt-1" />
                </div>
              ) : null
            )}

            {/* Origin */}
            {word.origin && (
              <div>
                <h2 className="font-semibold">Origin</h2>
                <p className="text-sm text-gray-700">{word.origin}</p>
              </div>
            )}

            {/* Meanings */}
            <div className="space-y-4">
              {word.meanings.map((meaning, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold italic">
                    {meaning.partOfSpeech}
                  </h3>

                  <ol className="list-decimal list-inside space-y-2 mt-1">
                    {meaning.definitions.map((def, i) => (
                      <li key={i}>
                        <p>{def.definition}</p>

                        {def.example && (
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Example:</strong> "{def.example}"
                          </p>
                        )}

                        {(def.synonyms.length > 0 ||
                          def.antonyms.length > 0) && (
                          <div className="text-sm text-gray-500 mt-1">
                            {def.synonyms.length > 0 && (
                              <p>
                                <strong>Synonyms:</strong>{" "}
                                {def.synonyms.join(", ")}
                              </p>
                            )}
                            {def.antonyms.length > 0 && (
                              <p>
                                <strong>Antonyms:</strong>{" "}
                                {def.antonyms.join(", ")}
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
        ))
      ) : (
        <p className="text-center text-red-400 text-xl sm:text-2xl lg:text-3xl pt-10">
          Couldn't find definitions for this word
        </p>
      )}
    </section>
  );
};

export default Word;
