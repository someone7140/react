"use client";

import { FC } from "react";
import { Icon } from "@iconify/react";

import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { menuStyle } from "@/style/MenuStyle";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const LoggedInMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  return (
    <>
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          onCLickMenu(TOP_PAGE_PATH);
        }}
      >
        <Icon
          icon="lucide:home"
          width="16"
          height="16"
          style={{ color: "#000000" }}
        />
        <div className="text-xl ml-3">Top</div>
      </div>
    </>
  );
};
