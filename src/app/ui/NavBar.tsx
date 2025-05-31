"use client";

import MainIcon from "../../../public/assets/main.svg";
import AnalysisIcon from "../../../public/assets/analysis.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  chosen: boolean;
  to: string;
  children: React.ReactNode;
}

const NavItem = ({ chosen, to, children }: NavItemProps) => {
  return (
    <Link
      href={to}
      className={`
                w-[80%] h-[50px] no-underline
                ${
                  chosen ? "bg-white text-[#7C3EF2]" : "bg-[#7C3EF2] text-white"
                }
                flex justify-center items-center font-bold text-[1.2rem]
                rounded-[15px] hover:text-[#7C3EF2]
            `}
    >
      {children}
    </Link>
  );
};

const NavBar = () => {
  const pathname = usePathname();

  return (
    <div className="w-[280px] h-screen max-w-[280px] bg-[#7C3EF2] flex flex-col pt-[100px] items-center fixed">
      <NavItem chosen={pathname === "/"} to="/">
        <MainIcon
          width={25}
          height={25}
          fill={pathname === "/" ? "blue" : "white"}
        />
        <span className="ml-2">데이터 수집</span>
      </NavItem>
      <NavItem chosen={pathname.startsWith("/analysis/")} to="/analysis/list">
        <AnalysisIcon
          width={25}
          height={25}
          fill={pathname.startsWith("/analysis/") ? "blue" : "white"}
        />
        <span className="ml-2">상품 분석</span>
      </NavItem>
    </div>
  );
};

export default NavBar;
