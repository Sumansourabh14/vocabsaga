import { toast } from "sonner";

const successMessage = "Word added to bookmark.";
const failureMessage = "Failed to save bookmark.";

export function handleSuccessMessage() {
  toast.success(successMessage);
}

export function handleFailureMessage() {
  toast.error(failureMessage);
}
