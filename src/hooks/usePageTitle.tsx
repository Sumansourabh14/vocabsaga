import { useEffect } from "react";

const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | VocabSaga`;
  }, []);
};

export default usePageTitle;
