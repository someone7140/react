"use client";

import { FC } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

import { MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { USER_ACCOUNT_REGISTER_PAGE_PATH } from "@/constants/MenuPathConstants";
import { menuDivStyle } from "@/style/MenuStyle";

type Props = {
  onClickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const NotLoginMenuListComponent: FC<Props> = ({ onClickMenu }) => {
  return (
    <MenubarContent>
      <MenubarItem
        onClick={() => {
          onClickMenu(USER_ACCOUNT_REGISTER_PAGE_PATH);
        }}
      >
        <div className={menuDivStyle()}>
          <Icon icon="fa6-solid:user-plus" width="20" height="20" />
          <div>ユーザー登録</div>
        </div>
      </MenubarItem>
    </MenubarContent>
  );
};
