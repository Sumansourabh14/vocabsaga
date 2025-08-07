import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, BookmarkCheck } from "lucide-react";

const BookmarkIconButton = ({
  handleBookmark,
  isBookmarked,
}: {
  handleBookmark: () => void;
  isBookmarked: boolean;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"outline"}
          onClick={handleBookmark}
          className="cursor-pointer"
        >
          {isBookmarked ? <BookmarkCheck /> : <Bookmark />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isBookmarked ? (
          <p>Remove word from bookmark</p>
        ) : (
          <p>Add word to bookmark</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export default BookmarkIconButton;
