import WordDataLoading from "@/components/loading/WordDataLoading";
import MeaningNotFound from "@/components/text/MeaningNotFound";
import WordDeepMeanings from "@/components/words/WordDeepMeanings";
import useFetchWordMeaning from "@/hooks/useFetchWordMeaning";
import { useParams } from "react-router";

const Word = () => {
  const { title } = useParams();

  const { data, isFetching } = useFetchWordMeaning(title ?? "");

  return (
    <section className="max-w-[1300px] mx-auto">
      <h1 className="text-center text-5xl sm:text-8xl lg:text-9xl font-bold">
        {title}
      </h1>

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
