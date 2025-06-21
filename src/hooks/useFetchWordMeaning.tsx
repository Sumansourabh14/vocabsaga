import { fetchMeaningOfWord } from "@/services/fetchWords";
import { useQuery } from "@tanstack/react-query";

const useFetchWordMeaning = (word: string) => {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["word", word],
    queryFn: () => fetchMeaningOfWord(word),
    enabled: !!word,
  });

  if (isError) {
    console.error("Error fetching word meaning:", error);
  }

  return { data, isFetching, error };
};

export default useFetchWordMeaning;
