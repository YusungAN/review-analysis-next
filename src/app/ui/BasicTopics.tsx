"use client";
import { useState } from "react";

interface BasicTopicsProps {
  prosList: string[][];
  consList: string[][];
}

const BasicTopics = (props: BasicTopicsProps) => {
  const { prosList, consList } = props;
  const [isPros, setIsPros] = useState(0);

  const changeIsPros = async (num: number) => {
    if (isPros === num) return;
    setIsPros(num);
  };

  return (
    <>
      <div className="w-[calc(100%-50px)] bg-white rounded-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] mt-[10px] flex flex-col justify-center pb-[20px]">
        <div className="font-bold text-[1.7em] w-full text-center mb-[20px] mt-[20px]">
          토픽 모델링 결과
        </div>
        <div className="flex mt-[10px] ml-[40px] mb-[20px]">
          <button
            onClick={() => changeIsPros(0)}
            className={`w-[100px] h-[30px] text-center leading-[30px] rounded-[8px] text-[0.8rem] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] mr-[10px] cursor-pointer ${
              isPros === 0
                ? "text-white bg-[#7C3EF2]"
                : "text-[#7C3EF2] bg-white"
            }`}
          >
            장점
          </button>
          <button
            onClick={() => changeIsPros(1)}
            className={`w-[100px] h-[30px] text-center leading-[30px] rounded-[8px] text-[0.8rem] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] mr-[10px] cursor-pointer ${
              isPros === 1
                ? "text-white bg-[#7C3EF2]"
                : "text-[#7C3EF2] bg-white"
            }`}
          >
            단점
          </button>
        </div>
        {isPros === 0 ? (
          prosList.length === 0 ? (
            <div className="w-full h-[180px] text-[1.2rem] font-bold text-[rgba(0,0,0,0.5)] text-center leading-[180px]">
              데이터 양이 적어 결과를 추출할 수 없습니다
            </div>
          ) : (
            prosList.map((keyword_list, idx) => {
              return (
                <div key={idx} className="flex flex-row mb-[10px]">
                  <div className="w-[10%] h-[30px] text-center border-r border-black leading-[30px] font-bold">
                    Topic{idx + 1}
                  </div>
                  <div className="w-[90%] h-[30px] text-center leading-[30px] overflow-x-auto text-[1.2rem]">
                    {keyword_list.join(" ")}
                  </div>
                </div>
              );
            })
          )
        ) : consList.length === 0 ? (
          <div className="w-full h-[180px] text-[1.2rem] font-bold text-[rgba(0,0,0,0.5)] text-center leading-[180px]">
            데이터 양이 적어 결과를 추출할 수 없습니다
          </div>
        ) : (
          consList.map((keyword_list, idx) => {
            return (
              <div key={idx} className="flex flex-row mb-[10px]">
                <div className="w-[10%] h-[30px] text-center border-r border-black leading-[30px] font-bold">
                  Topic{idx + 1}
                </div>
                <div className="w-[90%] h-[30px] text-center leading-[30px] overflow-x-auto text-[1.2rem]">
                  {keyword_list.join(" ")}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default BasicTopics;
