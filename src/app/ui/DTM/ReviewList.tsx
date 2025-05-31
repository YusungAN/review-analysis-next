interface ReviewListProps {
  reviews: string[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="w-[80%] h-[220px] flex justify-center items-center flex-nowrap flex-grow-0 flex-shrink-0 flex-col">
      {reviews.map((item, idx) => (
        <div
          key={idx}
          className="w-[90%] box-border border-b border-black leading-[50px] pl-[20px] pr-[10px] whitespace-nowrap overflow-x-auto overflow-y-hidden items-center [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-track]:bg-[rgba(0,0,0,0.1)] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[rgba(0,0,0,0.2)] [&::-webkit-scrollbar-thumb:hover]:bg-[rgba(0,0,0,0.4)] [&::-webkit-scrollbar-thumb:active]:bg-[rgba(0,0,0,0.9)]"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
