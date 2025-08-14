import type { BookmarkWordProps } from "@/types";
import { toast } from "sonner";

const successMessage = "Word added to bookmark";
const failureMessage = "Failed to save bookmark";
const removedSuccessMessage = "Word removed from bookmark";

export function handleSuccessMessage() {
  toast.success(successMessage);
}

export function handleFailureMessage() {
  toast.error(failureMessage);
}

export function handleRemovedSuccessMessage() {
  toast.success(removedSuccessMessage);
}

export function addBookmarksToLocalStorage(bookmarks: BookmarkWordProps[]) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

export function handleCustomSuccessMessage(message: string) {
  toast.success(message);
}
