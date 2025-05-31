interface TopicPerMonthProps {
  month: string;
  topicObj: { [month: string]: string[] };
  onChange: (word: string, topic: number, month: string) => void;
  chosenWord: string;
  chosenTopic: number;
  chosenMonth: string;
}

const TopicPerMonth = (props: TopicPerMonthProps) => {
  const { month, topicObj, onChange, chosenWord, chosenTopic, chosenMonth } =
    props;
  return (
    <div className="w-[80%] h-full overflow-x-auto">
      <div className="w-full text-center font-bold border-b-2 border-black text-[1.2rem] mt-[20px]">
        {month}
      </div>
      <div className="w-full h-[212px] flex flex-nowrap flex-grow-0 flex-shrink-0 flex-col">
        {month !== undefined &&
          topicObj[month].map((words: string, idx: number) => {
            return (
              <div
                key={idx}
                className="w-full box-border border-b border-black h-[60px] pl-[10px] pr-[10px] whitespace-nowrap overflow-x-auto overflow-y-hidden flex items-center [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-[rgba(0,0,0,0.1)] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[rgba(0,0,0,0.2)] [&::-webkit-scrollbar-thumb:hover]:bg-[rgba(0,0,0,0.4)] [&::-webkit-scrollbar-thumb:active]:bg-[rgba(0,0,0,0.9)]"
              >
                {words
                  .split(", ")
                  .slice(0, 5)
                  .map((innerWord, idx2) => {
                    if (innerWord !== "")
                      return (
                        <div
                          key={idx2}
                          className={`p-[10px] rounded-[10px] mb-[5px] mt-[5px] mr-[10px] cursor-pointer ${
                            innerWord === chosenWord &&
                            idx2 === chosenTopic &&
                            month === chosenMonth
                              ? "bg-[rgba(238,230,196,1)]"
                              : "bg-[rgba(238,230,196,0.5)]"
                          }`}
                          onClick={() => onChange(innerWord, idx2, month)}
                        >
                          {innerWord}
                        </div>
                      );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopicPerMonth;
