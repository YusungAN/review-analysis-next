import { getProductAnalysis } from "@/app/utils/db";
import BasicTopics from "@/app/ui/BasicTopics";
import DTM from "@/app/ui/DTM";
import { lazy, Suspense } from "react";

const GraphContainer = lazy(() => import("@/app/ui/GraphContainer")); // !!!

export default async function AnalysisItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const productInfo = await getProductAnalysis(id);
  const startDateStr = productInfo.p_data.trend_start_date;
  const startDate = new Date(
    Number(startDateStr.slice(0, 4)),
    Number(startDateStr.slice(4, 6)),
    Number(startDateStr.slice(6, 8))
  );
  const dateList = [];
  let i = 0;
  while (i < productInfo.p_data.trend.length) {
    dateList.push(
      `${startDate.getFullYear()}. ${
        startDate.getMonth() + 1
      }. ${startDate.getDate()}.`
    );
    startDate.setDate(startDate.getDate() + 7);
    i += 1;
  }

  return (
    <>
      <div className="text-[2rem] font-bold mt-[50px]">
        '{productInfo?.p_data.product_name}' 상품의 분석 결과입니다.
      </div>
      <BasicTopics
        prosList={productInfo?.p_data.pros!}
        consList={productInfo?.p_data.cons!}
      />
      <DTM
        productID={id}
        dtmResult={productInfo?.dtm_result!}
      />
      <div className="w-[calc(100%-50px)] h-[650px] bg-white rounded-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] mt-[10px] mb-[10px] flex flex-col justify-center items-center">
        <div className="text-[1.75rem] font-bold overflow-x-auto">
          트렌드 예측 그래프
        </div>
        {productInfo?.p_data.trend_warning && (
          <div className="text-base text-[rgba(255,0,0,0.5)] text-center">
            ※ 지난 3개년 간의 검색량이 부족하여 예측의 정확도가 매우 낮을 수
            있습니다.
          </div>
        )}
        <div className="w-full flex flex-col justify-center items-center pt-[25px] h-[80%]">
          <Suspense fallback={<div className="text-gray-300 text-[2rem] font-bold">로딩중...</div>}>
            <GraphContainer
              trend={[
                productInfo?.p_data.trend!,
                productInfo?.decomposed_trend!,
                productInfo?.decomposed_seasonal!,
              ]}
              dateList={dateList}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
