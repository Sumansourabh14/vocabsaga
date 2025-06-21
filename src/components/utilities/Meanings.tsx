import type { DictionaryEntry } from "@/services/fetchWords";

type MeaningProps = {
  parentKey: string;
  word: DictionaryEntry;
};

const Meanings = ({ parentKey, word }: MeaningProps) => {
  return (
    <div key={parentKey} className="space-y-6 text-left">
      {word.meanings.map((item, index) => (
        <div key={index} className="space-y-2">
          {/* Part of Speech */}
          <p className="text-lg font-semibold italic">{item.partOfSpeech}</p>

          {/* Only the first definition */}
          {item.definitions.slice(0, 1).map((definition, i) => (
            <div key={i} className="pl-4 border-l-2 border-gray-300">
              <p className="text-base">{definition.definition}</p>

              {/* Optional example */}
              {definition.example && (
                <div className="mt-1 text-sm text-gray-600">
                  <p className="font-medium">Example:</p>
                  <p className="italic">"{definition.example}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Meanings;
