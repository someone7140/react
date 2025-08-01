"use client";

import { FC } from "react";

import { MenuComponent } from "@/components/menu/MenuComponent";

export const HeaderComponent: FC = ({}) => {
  return (
    <div className="sticky top-0 z-10 h-[65px] rounded-none bg-cyan-50 py-3">
      <div className="flex items-center justify-between text-blue-gray-900 w-[100%]">
        <div className="flex items-center gap-7 ml-5">
          <div className="w-[50px]">
            <MenuComponent />
          </div>
          <div className="text-2xl font-semibold">小説管理ツール</div>
        </div>
      </div>
    </div>
  );
};
