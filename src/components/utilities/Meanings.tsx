import type { DictionaryEntry } from "@/services/fetchWords";

type MeaningProps = {
  parentKey: string;
  word: DictionaryEntry;
};

const Meanings = ({ parentKey, word }: MeaningProps) => {
  return (
    <div key={parentKey}>
      {word.meanings.map((item, index) => (
        <div key={index}>
          <p>{item.partOfSpeech}</p>
          {item.definitions.map((definition, i) => (
            <div key={i}>
              <p>{definition.definition}</p>
              <div>
                <p>Example:</p>
                <p>{definition.example}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Meanings;
