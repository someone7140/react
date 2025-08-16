"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

import { LoginMenuListComponent } from "./list/LoginMenuListComponent";
import { NotLoginMenuListComponent } from "./list/NotLoginMenuListComponent";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useAppSelector } from "@/store/reduxStore";

export const MenuComponent: FC = ({}) => {
  const router = useRouter();
  const userAccount = useAppSelector((state) => state.userAccount);

  const onClickMenu = (path: string, reloadFlag?: boolean) => {
    if (reloadFlag) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  return (
    <Menubar className="border-none bg-cyan-50">
      <MenubarMenu>
        <MenubarTrigger className="data-[state=open]:bg-cyan-50 hover:bg-cyan-50 focus:bg-cyan-50">
          <Icon
            icon="lucide:menu"
            width="32"
            height="32"
            className="cursor-pointer"
          />
        </MenubarTrigger>
        {!userAccount && (
          <NotLoginMenuListComponent onClickMenu={onClickMenu} />
        )}
        {userAccount && <LoginMenuListComponent onClickMenu={onClickMenu} />}
      </MenubarMenu>
    </Menubar>
  );
};
