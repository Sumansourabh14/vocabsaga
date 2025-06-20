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

  if (error) {
    console.error({ error });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{word}</DialogTitle>
        <section>
          {addedAt && (
            <DialogDescription>
              {displayFormatedDate(addedAt)}
            </DialogDescription>
          )}
          {isFetching && <p>Loading...</p>}
          {data &&
            data.map((word) => <Meanings parentKey={word.word} word={word} />)}
        </section>
      </DialogHeader>
      <DialogFooter>
        <DeleteIconButton handleDelete={() => handleDelete(id)} />
      </DialogFooter>
    </DialogContent>
  );
};

export default WordPopup;
