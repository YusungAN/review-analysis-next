import Link from "next/link";
import { getProjectList } from "@/app/utils/db";
import RefreshIcon from "../../../../public/assets/refresh.svg";

export default async function ProjectListPage() {
  const projectList = await getProjectList();

  return (
    <div className="bg-[#f9f9f9] flex text-black">
      <div className="w-full">
        <h1 className="text-3xl font-bold mt-[50px] mb-[20px]">상품 분석</h1>
        <div className="text-2xl font-bold mt-[75px] mb-[20px]">
          프로젝트의 분석 결과를 확인하세요
        </div>
        <div className="w-[calc(100%-50px)] bg-white rounded-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] pt-[20px] pb-[20px] flex flex-col items-center">
          <div className="w-[95%] h-[30px] text-[1.1rem] font-bold flex border-b-2 border-black">
            <div className="w-[30%] text-center">id</div>
            <div className="w-[70%] text-center">프로젝트 이름</div>
          </div>
          {projectList === undefined ? (
            <div className="w-full h-[50px] text-[1.2rem] font-bold text-[rgb(125,125,125)] text-center leading-[50px]">
              로딩중..
            </div>
          ) : (
            projectList.map((info, idx) => {
              return (
                <Link
                  key={idx}
                  href={`/analysis/${info.id}`}
                  className="w-[95%] h-[50px] leading-[50px] text-base text-black flex border-b border-black hover:bg-[#f9f9f9]"
                >
                  <div className="w-[30%] text-center">{info.id}</div>
                  <div className="w-[70%] text-center">{info.project_name}</div>
                </Link>
              );
            })
          )}
        </div>

        <div className="flex items-center">
          <div className="text-2xl font-bold mt-[100px] mb-[20px]">
            분석 진행중인 프로젝트의 상태를 확인하세요
          </div>
          <RefreshIcon
            width={30}
            height={30}
            className="cursor-pointer mt-[80px] ml-[10px]"
            // onClick={handleGetLists}
          />
          {/* <div className="mt-[85px] ml-[10px]">
            마지막 업데이트: <span>{updateSec}</span>초 전
          </div> */}
        </div>
        <div className="w-[calc(100%-50px)] bg-white rounded-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)] pt-[20px] pb-[20px] flex flex-col items-center">
          <div className="w-[95%] h-[30px] text-[1.1rem] font-bold flex border-b-2 border-black">
            <div className="w-[30%] text-center">프로젝트 이름</div>
            <div className="w-[70%] text-center">상태</div>
          </div>
          {/* {Object.keys(status).length === 0 ? (
            <></>
          ) : (
            Object.keys(status).map((name, idx) => {
              return (
                <Link
                  key={idx}
                  href={`/analysis/${name}`}
                  className="w-[95%] h-[50px] leading-[50px] text-base text-black flex border-b border-black hover:bg-[#f9f9f9]"
                >
                  <div className="w-[30%] text-center">{name}</div>
                  <div className="w-[70%] text-center">
                    {messages[status[name] - 1]}
                  </div>
                </Link>
              );
            })
          )} */}
        </div>
      </div>
    </div>
  );
}
