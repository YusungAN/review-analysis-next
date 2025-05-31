import ArrowIcon from "../../../../public/assets/next.svg";
import TopicPerMonth from "../TopicPerMonth";
import { DTMItemMonth } from "../../data";

interface TopicNavigationProps {
  dtmResult: DTMItemMonth[];
  monthList: string[];
  timestampIdx: number;
  dtmTopicData: { [month: string]: string[] } | undefined;
  chosenWord: string;
  chosenTopic: number;
  chosenMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onChangeWord: (word: string, topic: number, month: string) => void;
}

const TopicNavigation = ({
  dtmResult,
  monthList,
  timestampIdx,
  dtmTopicData,
  chosenWord,
  chosenTopic,
  chosenMonth,
  onPrevMonth,
  onNextMonth,
  onChangeWord,
}: TopicNavigationProps) => {
  return (
    <div className="w-[45%] h-[300px] bg-white rounded-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] mt-[10px] flex justify-center items-center">
      <ArrowIcon
        width={50}
        height={50}
        transform="rotate(180)"
        fill={timestampIdx === 0 ? "grey" : "black"}
        onClick={onPrevMonth}
        className="cursor-pointer"
      />
      {dtmResult.length === 0 ? (
        <></>
      ) : (
        <TopicPerMonth
          month={monthList[timestampIdx]}
          topicObj={dtmTopicData!}
          onChange={onChangeWord}
          chosenWord={chosenWord}
          chosenTopic={chosenTopic}
          chosenMonth={chosenMonth}
        />
      )}
      <ArrowIcon
        width={50}
        height={50}
        transform="rotate(0)"
        fill={timestampIdx === monthList.length - 1 ? "grey" : "black"}
        onClick={onNextMonth}
        className="cursor-pointer"
      />
    </div>
  );
};

export default TopicNavigation;
