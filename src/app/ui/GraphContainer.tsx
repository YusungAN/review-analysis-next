"use client";
import { useState } from "react";
import TrendChart from "./TrendChart";

const GraphContainer = (props: { trend: number[][]; dateList: string[] }) => {
  const { trend, dateList } = props;
  const [forecastCheck, setForecastCheck] = useState(false);

  return (
    <>
      <div className="flex justify-center items-center">
        <div>트렌드 예측 결과 포함</div>
        <input
          type="checkbox"
          checked={forecastCheck}
          onChange={() => setForecastCheck(!forecastCheck)}
          className="ml-2"
        />
      </div>
      {trend.length === 0 ? (
        <div className="w-full h-[240px] text-[1.2rem] font-bold text-[rgba(0,0,0,0.5)] text-center leading-[240px]">
          로딩중...
        </div>
      ) : trend[0][0] === -1 ? (
        <div className="w-full h-[240px] text-[1.2rem] font-bold text-[rgba(0,0,0,0.5)] text-center leading-[240px]">
          트렌드 예측이 수행되지 않았습니다.
        </div>
      ) : (
        <TrendChart
          frequency={trend}
          x={dateList}
          label="검색량 추이"
          forecastCheck={forecastCheck}
        />
      )}
    </>
  );
};

export default GraphContainer;
