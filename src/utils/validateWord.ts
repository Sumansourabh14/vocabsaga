export function isLocallyValidWord(word: string): {
  success: boolean;
  message?: string;
} {
  const trimmed = word.trim();

  if (trimmed.length === 0) {
    return { success: false, message: "Word must contain at least 1 letter" };
  }

  if (trimmed.length === 1 && !["a", "i"].includes(trimmed.toLowerCase())) {
    return {
      success: false,
      message: "Single-letter words must be 'a' or 'i'",
    };
  }

  if (!/^[a-zA-Z]+$/.test(trimmed)) {
    return { success: false, message: "Word must contain only letters (A–Z)" };
  }

  return { success: true };
}
