interface ProductProfileProps {
  imgUrl: string;
  productName: string;
  reviewCount: number;
}

const ProductProfile = ({
  imgUrl,
  productName,
  reviewCount,
}: ProductProfileProps) => {
  return (
    <div className="flex">
      <img src={imgUrl} className="w-[200px] h-[200px]" alt="Product" />
      <div>
        <div className="text-[1.5rem] font-bold ml-[10px]">{productName}</div>
        <div className="text-[1.5rem] font-bold ml-[10px]">
          리뷰 개수: {reviewCount}개{" "}
          <span className="text-base">(최대 20,000개까지 수집)</span>
        </div>
        {reviewCount < 1000 && (
          <div className="text-base text-[rgba(255,0,0,0.5)] ml-[10px]">
            * 리뷰 개수가 부족하여 일부 분석 결과의 신뢰도가 떨어질 수 있습니다.{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductProfile;
