"use client";

import { FC } from "react";
import { Icon } from "@iconify/react";

import {
  TOP_PAGE_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { menuStyle } from "@/style/MenuStyle";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const NotLoginMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  const { removeAuthInfo } = useAuthManagement();

  return (
    <div className="flex flex-col gap-3">
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          onCLickMenu(TOP_PAGE_PATH);
        }}
      >
        <Icon
          icon="lucide:home"
          width="18"
          height="18"
          style={{ color: "#000000" }}
        />
        <div className="text-xl ml-3">Top</div>
      </div>
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          removeAuthInfo();
          onCLickMenu(USER_ACCOUNT_REGISTER_PAGE_PATH);
        }}
      >
        <Icon
          icon="mdi:account-plus"
          width="18"
          height="18"
          style={{ color: "#000000" }}
        />
        <div className="text-xl ml-3">ユーザ登録</div>
      </div>
    </div>
  );
};
