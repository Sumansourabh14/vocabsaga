import { displayFormatedDate } from "@/utils/displayFormatedDate";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type WordProps = {
  word: string;
  addedAt?: string;
};

const WordPopup = ({ word, addedAt }: WordProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{word}</DialogTitle>
        <DialogDescription>
          {addedAt && <p className="text-sm">{displayFormatedDate(addedAt)}</p>}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default WordPopup;
