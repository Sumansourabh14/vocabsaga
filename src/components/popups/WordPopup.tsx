import { displayFormatedDate } from "@/utils/displayFormatedDate";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import DeleteIconButton from "../buttons/iconButtons/DeleteIconButton";

type WordProps = {
  word: string;
  addedAt?: string;
  id: number;
  handleDelete: (id: number) => void;
};

const WordPopup = ({ word, addedAt, handleDelete, id }: WordProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{word}</DialogTitle>
        <DialogDescription>
          {addedAt && <p className="text-sm">{displayFormatedDate(addedAt)}</p>}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DeleteIconButton handleDelete={() => handleDelete(id)} />
      </DialogFooter>
    </DialogContent>
  );
};

export default WordPopup;
