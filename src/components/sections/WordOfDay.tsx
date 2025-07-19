import useFetchWordMeaning from "@/hooks/useFetchWordMeaning";
import { getWordOfTheDay } from "@/utils/getWordOfDay";
import WordDataLoading from "../loading/WordDataLoading";
import MeaningNotFound from "../text/MeaningNotFound";
import WordDeepMeanings from "../words/WordDeepMeanings";

const WordOfDay = () => {
  const word = getWordOfTheDay();
  console.log({ word });

  const { data, isFetching } = useFetchWordMeaning(word);
  console.log({ data, isFetching });

  return (
    <section className="max-w-[1300px] mx-auto py-20">
      <h2 className="text-center text-3xl sm:text-5xl lg:text-6xl font-extralight mb-10">
        Word of the Day
      </h2>
      <h3 className="text-center text-2xl sm:text-4xl lg:text-5xl font-bold">
        {word}
      </h3>

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

export default WordOfDay;
