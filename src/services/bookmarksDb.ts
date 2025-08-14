import { supabase } from "@/supabase/supabase-client";
import type { BookmarkWordDbProps, BookmarkWordProps } from "@/types";

const bookMarksTable = "bookmarks";

export const syncLocalBookmarksToDb = async (userId: string) => {
  const localBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  if (localBookmarks.length === 0) return;

  const { data: existing, error: fetchError } = await supabase
    .from("bookmarks")
    .select("word")
    .eq("user_id", userId);

  if (fetchError) {
    console.error("Error fetching bookmarks from Db:", fetchError);
    return;
  }

  // Filter local bookmarks that are NOT already in Db
  const newBookmarks = localBookmarks.filter(
    (localItem: BookmarkWordProps) =>
      !existing.some((dbItem) => dbItem.word === localItem.word)
  );

  if (newBookmarks.length === 0) return; // nothing new to add

  // 4. Insert new bookmarks to Supabase
  const { error: insertError } = await supabase.from("bookmarks").insert(
    newBookmarks.map((item: BookmarkWordDbProps) => ({
      user_id: userId,
      word: item.word,
      created_at: new Date().toISOString(),
    }))
  );

  if (insertError) {
    console.error("Error inserting new bookmarks:", insertError);
  } else {
    console.log("Synced local bookmarks to Supabase successfully!");
    // Optional: Clear localStorage after sync
    localStorage.removeItem("bookmarks");
  }
};

export const fetchBookmarksFromDb = async (userId: string) => {
  const { data, error: fetchError } = await supabase
    .from(bookMarksTable)
    .select()
    .eq("user_id", userId);

  if (fetchError) {
    console.error("Error fetching bookmarks from Db:", fetchError);
    return;
  }

  console.log({ data });
  return data;
};
