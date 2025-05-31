"use client";
import { useState } from "react";
import { ProductPreview } from "../data";
import ProductProfile from "../ui/ProductProfile";
import WordSelector from "../ui/WordSelector";
import useInput from "../hooks/useInput";

const enum LOAD_CHECK {
  INIT,
  LOADING,
  END,
  ERROR,
};

export default function AnalysisPage() {
  const [productBasicInfo, setProductBasicInfo] = useState<ProductPreview>();
  const [chosenKeywordIdx, setChosenKeywordIdx] = useState<number>(-1);
  const [chosenCategoryIdx, setChosenCategoryIdx] = useState<number>(-1);
  const [loadingStatus, setLoadingStatus] = useState<LOAD_CHECK>(
    LOAD_CHECK.INIT
  );

  const projectNameInput = useInput("");
  const productNameInput = useInput("");
  const categoryInput = useInput("");
  const urlInput = useInput("");

  const onChangeUrl = async (url: string) => {
    // setLoadingStatus(LOAD_CHECK.LOADING);
    // if (url === '') {
    //     setLoadingStatus(LOAD_CHECK.INIT);
    // }

    // try {
    //     const data = await crawlProductBasicInfo(url);
    //     setProductBasicInfo(data);
    //     console.log(data);
    //     setLoadingStatus(LOAD_CHECK.END);
        
    // } catch (err) {
    //     console.log(err);
    //     setLoadingStatus(LOAD_CHECK.ERROR);
    // }
};

const handleStartAnalysis = async () => {
    // const data = await startAnalysis(urlInput.value, projectNameInput.value, productNameInput.value, categoryInput.value);
    // console.log(data);
    // if (data.success) {
    //     alert('분석이 성공적으로 시작되었습니다.');
    // } else {
    //     alert(data.message);
    // }
};

const changeChosenKeywordIdx = (idx: number, word: string) => {
    setChosenKeywordIdx(idx);
    productNameInput.changeValue(word);
};

const changeChosenCategoryIdx = (idx: number, word: string) => {
    setChosenCategoryIdx(idx);
    categoryInput.changeValue(word);
};

  return (
    <>
      <div className="text-3xl font-bold mt-[50px] text-black">
        리뷰를 수집할 상품 링크를 입력해주세요
      </div>
      <ul className="mt-[15px] mb-[20px] pl-[20px]">
        <li className="text-[#7f7f7f] list-disc marker:text-[#7f7f7f]">
          네이버 스마트스토어 링크만 가능해요 (smartstore.naver.com,
          brand.naver.com)
        </li>
        <li className="text-[#7f7f7f] list-disc marker:text-[#7f7f7f]">
          링크가 'https://'로 시작하도록 해주세요
        </li>
        <li className="text-[#7f7f7f] list-disc marker:text-[#7f7f7f]">
          현재 여러 사정으로 새로운 상품을 분석하기는 어렵습니다.(네이버 쇼핑
          크롤링 방지 방안 강화/상세 path 변경/현재 AI 모델을 서빙할 수준의 서버
          구축 어려움)
        </li>
      </ul>
      <div className="w-[calc(100%-50px)] h-[70vh] bg-white rounded-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] overflow-y-auto">
        <input
          onChange={urlInput.onChange}
          value={urlInput.value}
          placeholder="링크 입력"
          className="w-[90%] h-[70px] ml-[5%] mt-[40px] bg-[#eeeff3] rounded-[20px] outline-none border-none text-[1.5rem] text-black pl-[15px] font-light focus:shadow-[0px_0px_5px_rgba(0,0,0,0.3)]"
        />
        {loadingStatus === LOAD_CHECK.END ? (
          <div
            className={`w-[90%] ml-[5%] mt-[20px] ${
              productBasicInfo ? "block" : "hidden"
            }`}
          >
            <ProductProfile
              imgUrl={productBasicInfo!.img_url}
              productName={productBasicInfo!.product_name}
              reviewCount={productBasicInfo!.review_cnt}
            />
            <div className="text-[1.5rem] font-bold mt-[30px]">
              프로젝트 제목을 적어주세요
            </div>
            <input
              onChange={projectNameInput.onChange}
              value={projectNameInput.value}
              placeholder="프로젝트 이름"
              className="w-[200px] h-[30px] mt-[10px] bg-[#eeeff3] rounded-[10px] outline-none border-none text-base pl-[15px] font-light focus:shadow-[0px_0px_5px_rgba(0,0,0,0.3)]"
            />
            <div className="text-[1.5rem] font-bold mt-[30px]">
              트렌드 파악에 활용될 상품 키워드를 적어주세요
            </div>
            <input
              onChange={productNameInput.onChange}
              value={productNameInput.value}
              placeholder="상품 이름"
              className="w-[200px] h-[30px] mt-[10px] bg-[#eeeff3] rounded-[10px] outline-none border-none text-base pl-[15px] font-light focus:shadow-[0px_0px_5px_rgba(0,0,0,0.3)]"
            />
            <div className="text-[#7f7f7f] mt-[10px]">추천 키워드</div>
            <div className="flex w-full overflow-x-auto whitespace-nowrap">
              {productBasicInfo !== undefined && (
                <WordSelector
                  wordList={[
                    productBasicInfo.model_name,
                    ...productBasicInfo.word_list,
                  ]}
                  chosenIdx={chosenKeywordIdx}
                  onChangeChosenWord={changeChosenKeywordIdx}
                />
              )}
            </div>
            <div className="text-[1.5rem] font-bold mt-[30px]">
              트렌드 파악에 활용될 2차 키워드를 적어주세요
            </div>
            <input
              onChange={categoryInput.onChange}
              value={categoryInput.value}
              placeholder="2차 키워드"
              className="w-[200px] h-[30px] mt-[10px] bg-[#eeeff3] rounded-[10px] outline-none border-none text-base pl-[15px] font-light focus:shadow-[0px_0px_5px_rgba(0,0,0,0.3)]"
            />
            <div className="text-[#7f7f7f] mt-[10px]">
              추천 키워드(카테고리/브랜드 추천)
            </div>
            <div className="flex overflow-x-auto">
              {productBasicInfo !== undefined && (
                <WordSelector
                  wordList={[
                    productBasicInfo.brand_name,
                    ...productBasicInfo.category_list,
                  ]}
                  chosenIdx={chosenCategoryIdx}
                  onChangeChosenWord={changeChosenCategoryIdx}
                />
              )}
            </div>
            <button
              onClick={handleStartAnalysis}
              className="w-[150px] h-[50px] ml-[calc(100%-130px)] text-white bg-[#7C3EF2] rounded-[10px] text-[1.2rem] mb-[20px]"
            >
              시작하기
            </button>
          </div>
        ) : (
          <div className="w-full h-[40vh] text-center leading-[40vh] text-[1.7rem] text-[rgba(0,0,0,0.3)]">
            {loadingStatus === LOAD_CHECK.INIT ? (
              "링크를 입력하세요"
            ) : loadingStatus === LOAD_CHECK.LOADING ? (
              "로딩중..."
            ) : (
              <>
                <div>링크에서 정보를 불러올 수 없습니다.</div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
