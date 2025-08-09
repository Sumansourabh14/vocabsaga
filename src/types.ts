export interface WordPassage {
  id: string;
  word: string;
  word_meaning: string;
  difficulty_level: string;
  source_book?: string;
  source_author?: string;
  passages: {
    [key: string]: string;
  };
}
export interface Quote {
  _id: string;
  quote: string;
  book: string;
  author: string;
}

export type BookmarkWordProps = {
  id: string;
  word: string;
  addedAt: string;
};
