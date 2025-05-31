interface WordSelectorProps {
  wordList: string[];
  chosenIdx: number;
  onChangeChosenWord: (idx: number, word: string) => void;
}

const WordSelector = ({
  wordList,
  chosenIdx,
  onChangeChosenWord,
}: WordSelectorProps) => {
  return (
    <>
      {wordList.map((word, idx) => {
        if (word !== undefined) {
          return (
            <div
              key={idx}
              className={`
                                p-[10px] rounded-[10px] mb-[5px] mt-[5px]
                                ${
                                  chosenIdx === idx
                                    ? "bg-[rgba(0,0,0,0.1)]"
                                    : "bg-white"
                                }
                                mr-[10px] shadow-[1px_1px_5px_rgba(0,0,0,0.2)]
                                text-[min(1vw,1rem)]
                            `}
              onClick={() => onChangeChosenWord(idx, word)}
            >
              {word}
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default WordSelector;
