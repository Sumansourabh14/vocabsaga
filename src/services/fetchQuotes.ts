import axios from "axios";

export const fetchRandomQuote = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_QUOTES_API_ENDPOINT}/api/v1/random`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
