import { displayFormatedDate } from "@/utils/displayFormatedDate";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import DeleteIconButton from "../buttons/iconButtons/DeleteIconButton";
import { useQuery } from "@tanstack/react-query";
import { fetchMeaningOfWord } from "@/services/fetchWords";
import Meanings from "../utilities/Meanings";
import { Link } from "react-router";

type WordProps = {
  word: string;
  addedAt?: string;
  id: number;
  handleDelete: (id: number) => void;
};

const WordPopup = ({ word, addedAt, handleDelete, id }: WordProps) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["word", word],
    queryFn: () => fetchMeaningOfWord(word),
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center text-4xl md:text-5xl text-bold">
          {word}
        </DialogTitle>
        <section>
          {addedAt && (
            <DialogDescription className="text-left">
              {displayFormatedDate(addedAt)}
            </DialogDescription>
          )}
          {isFetching && <p>Loading...</p>}
          {error && (
            <p className="text-red-600">
              Oops! Couldn't find any definition for this word
            </p>
          )}
          {data &&
            data.map((word) => <Meanings parentKey={word.word} word={word} />)}
        </section>
      </DialogHeader>
      <DialogFooter>
        <section className="flex justify-between items-center gap-4 w-full">
          {!error && (
            <Link to={`/word/${word}`} className="underline">
              See more
            </Link>
          )}
          <DeleteIconButton handleDelete={() => handleDelete(id)} />
        </section>
      </DialogFooter>
    </DialogContent>
  );
};

export default WordPopup;
