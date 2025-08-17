"use client";
import Link from "next/link";
import { ProjectListItem } from "@/app/data";

const ProjectListComponent = ({
  projectList,
}: {
  projectList: ProjectListItem[];
}) => {
  if (projectList === undefined) {
    return (
      <div className="w-full h-[50px] text-[1.2rem] font-bold text-[rgb(125,125,125)] text-center leading-[50px]">
        로딩중..
      </div>
    );
  }

  return (
    <>
      {projectList.map((info, idx) => {
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
      })}
    </>
  );
};

export default ProjectListComponent;
