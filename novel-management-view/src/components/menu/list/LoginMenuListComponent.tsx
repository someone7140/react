"use client";

import { FC } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { toast } from "sonner";

import { MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { NOVEL_LIST_PATH, TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { useAppDispatch } from "@/store/reduxStore";
import { menuDivStyle } from "@/style/MenuStyle";
import { clearAuthToken } from "@/store/slice/authStorageSlice";
import { clearUserAccount } from "@/store/slice/userAccountSlice";

type Props = {
  onClickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const LoginMenuListComponent: FC<Props> = ({ onClickMenu }) => {
  const dispatch = useAppDispatch();

  return (
    <MenubarContent>
      <MenubarItem
        onClick={() => {
          onClickMenu(NOVEL_LIST_PATH);
        }}
      >
        <div className={menuDivStyle()}>
          <Icon
            icon="fluent-emoji-high-contrast:books"
            width="20"
            height="20"
            style={{ color: "black" }}
          />
          <div>小説一覧</div>
        </div>
      </MenubarItem>
      <MenubarItem
        onClick={() => {
          dispatch(clearAuthToken());
          dispatch(clearUserAccount());
          toast.info("ログアウトしました");
          onClickMenu(TOP_PAGE_PATH);
        }}
      >
        <div className={menuDivStyle()}>
          <Icon icon="solar:logout-2-outline" width="20" height="20" />
          <div>ログアウト</div>
        </div>
      </MenubarItem>
    </MenubarContent>
  );
};
