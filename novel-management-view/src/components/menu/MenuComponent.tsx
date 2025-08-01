"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

import { NotLoginMenuListComponent } from "./list/NotLoginMenuListComponent";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export const MenuComponent: FC = ({}) => {
  const router = useRouter();

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
        <NotLoginMenuListComponent onClickMenu={onClickMenu} />
      </MenubarMenu>
    </Menubar>
  );
};
