import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

type Props = {
  handleDelete: () => void;
};

const DeleteIconButton = ({ handleDelete }: Props) => {
  return (
    <Button
      variant="destructive"
      size="icon"
      className="size-8 cursor-pointer"
      title="Delete"
      onClick={handleDelete}
    >
      <TrashIcon />
    </Button>
  );
};

export default DeleteIconButton;
