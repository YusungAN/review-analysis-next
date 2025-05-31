import ArrowIcon from "../../../../public/assets/next.svg";
import ReviewList from "./ReviewList";

interface ReviewSectionProps {
  chosenWord: string;
  originalReviewList: string[];
  nowSentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const ReviewSection = ({
  chosenWord,
  originalReviewList,
  nowSentPage,
  onPrevPage,
  onNextPage,
}: ReviewSectionProps) => {
  return (
    <div className="w-[calc(55%-10px)] h-[300px] bg-white rounded-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] mt-[10px] ml-[10px]">
      <div className="flex mt-[20px] ml-[30px]">
        <button className="w-[100px] h-[30px] text-center leading-[30px] rounded-[8px] text-[0.8rem] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] mr-[10px] mb-[10px] cursor-pointer text-white bg-[#7C3EF2]">
          리뷰 원본
        </button>
      </div>
      <div className="w-full h-[300px] flex justify-center items-center pb-[50px] mt-[-13px]">
        <ArrowIcon
          width={50}
          height={50}
          transform="rotate(180)"
          fill={nowSentPage === 0 ? "grey" : "black"}
          onClick={onPrevPage}
          className="cursor-pointer"
        />
        {chosenWord === "" ? (
          <div className="w-full h-[240px] text-[1.2rem] font-bold text-[rgba(0,0,0,0.5)] text-center leading-[240px]">
            왼쪽에서 단어를 선택해보세요!
          </div>
        ) : originalReviewList.length === 0 ? (
          <></>
        ) : (
          <ReviewList
            reviews={originalReviewList.slice(nowSentPage, nowSentPage + 5)}
          />
        )}
        <ArrowIcon
          width={50}
          height={50}
          transform="rotate(0)"
          fill={
            nowSentPage + 1 >= Math.ceil(originalReviewList.length / 5)
              ? "grey"
              : "black"
          }
          onClick={onNextPage}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ReviewSection;
