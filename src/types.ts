export interface WordPassage {
  id: string;
  passage: string;
  word: string;
  word_meaning: string;
  difficulty_level: string;
  source_book?: string;
  source_author?: string;
}

export type BookmarkWordProps = {
  id: string;
  word: string;
  addedAt: string;
};
