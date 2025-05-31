"use client";
import { useState, useEffect } from "react";
import { DTMItemMonth } from "../data";
import { getOriginalReview } from "../utils/db";
import TopicNavigation from "./DTM/TopicNavigation";
import ReviewSection from "./DTM/ReviewSection";

interface DTMProps {
  productID: string;
  dtmResult: DTMItemMonth[];
}

const DTM = (props: DTMProps) => {
  const { productID, dtmResult } = props;

  const [dtmTopicData, setDtmTopicData] = useState<{
    [month: string]: string[];
  }>();
  const [monthList, setMonthList] = useState<string[]>([]);
  const [chosenWord, setChosenWord] = useState<string>("");
  const [chosenTopic, setChosenTopic] = useState<number>(0);
  const [chosenMonth, setChosenMonth] = useState<string>("");
  const [originalReviewList, setOriginalReviewList] = useState<string[]>([]);
  const [nowSentPage, setNowSentPage] = useState<number>(0);
  const [timestampIdx, setTimestampIdx] = useState<number>(0);
  const [infoMode, setInfoMode] = useState<number>(0);

  const changeChosenWord = (word: string, topic: number, month: string) => {
    setChosenWord(word);
    setChosenMonth(month);
    setChosenTopic(topic);
  };

  const getTopicPerMonthData = () => {
    const { topicData, monthList } = dtmResult.reduce(
      (acc, obj) => {
        if (obj.topic === -1) return acc;

        if (!acc.monthList.includes(obj.month)) {
          acc.monthList.push(obj.month);
          acc.topicData[obj.month] = [];
        }

        acc.topicData[obj.month].push(obj.words);
        return acc;
      },
      {
        topicData: {} as { [month: string]: string[] },
        monthList: [] as string[],
      }
    );

    setDtmTopicData(topicData);
    setMonthList(monthList);
  };

  const nextPage = () => {
    if (nowSentPage + 1 >= Math.ceil(originalReviewList.length / 5)) {
      return;
    }
    setNowSentPage(nowSentPage + 1);
  };

  const prevPage = () => {
    if (nowSentPage <= 0) {
      return;
    }
    setNowSentPage(nowSentPage - 1);
  };

  const nextMonth = () => {
    if (timestampIdx + 1 >= monthList.length) return;
    setTimestampIdx(timestampIdx + 1);
  };

  const prevMonth = () => {
    if (timestampIdx - 1 < 0) return;
    setTimestampIdx(timestampIdx - 1);
  };

  const handleOriginalReview = async () => {
    if (chosenWord === "") return;
    const data = await getOriginalReview(productID, chosenWord);
    setOriginalReviewList(data);
    setNowSentPage(0);
  };

  useEffect(() => {
    setOriginalReviewList([]);
    handleOriginalReview();
  }, [chosenWord, infoMode]);

  useEffect(() => {
    getTopicPerMonthData();
  }, [dtmResult]);

  const changeInfoMode = async (num: number) => {
    if (infoMode === num) return;
    setInfoMode(num);
  };

  return (
    <div className="w-[calc(100%-50px)] flex">
      <TopicNavigation
        dtmResult={dtmResult}
        monthList={monthList}
        timestampIdx={timestampIdx}
        dtmTopicData={dtmTopicData}
        chosenWord={chosenWord}
        chosenTopic={chosenTopic}
        chosenMonth={chosenMonth}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onChangeWord={changeChosenWord}
      />
      <ReviewSection
        chosenWord={chosenWord}
        originalReviewList={originalReviewList}
        nowSentPage={nowSentPage}
        onPrevPage={prevPage}
        onNextPage={nextPage}
      />
    </div>
  );
};

export default DTM;
