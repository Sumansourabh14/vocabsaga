import useFetchWordMeaning from "@/hooks/useFetchWordMeaning";
import { getWordOfTheDay } from "@/utils/getWordOfDay";
import WordDataLoading from "../loading/WordDataLoading";
import MeaningNotFound from "../text/MeaningNotFound";
import WordDeepMeanings from "../words/WordDeepMeanings";

const WordOfDay = () => {
  const word = getWordOfTheDay();

  const { data, isFetching } = useFetchWordMeaning(word);

  return (
    <section className="max-w-[1300px] mx-auto py-8">
      <h2 className="text-center text-2xl sm:text-4xl lg:text-5xl">{word}</h2>

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
