"use client";

import { FC, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { ControlledMenu, useClick } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

import { LoggedInMenuListComponent } from "@/components/menu/list/LoggedInMenuListComponent";
import { NotLoginMenuListComponent } from "@/components/menu/list/NotLoginMenuListComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const MenuComponent: FC = ({}) => {
  const menuRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const anchorProps = useClick(isOpen, setOpen);
  const { userAccount } = useAuthManagement();
  const router = useRouter();

  const onCLickMenu = (path: string, reloadFlag?: boolean) => {
    if (reloadFlag) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  return (
    <>
      <div ref={menuRef} {...anchorProps} className="cursor-pointer">
        {isOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </div>
      <ControlledMenu
        state={isOpen ? "open" : "closed"}
        onClose={() => setOpen(false)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        anchorRef={menuRef as any}
      >
        {!userAccount && (
          <NotLoginMenuListComponent onCLickMenu={onCLickMenu} />
        )}
        {userAccount && <LoggedInMenuListComponent onCLickMenu={onCLickMenu} />}
      </ControlledMenu>
    </>
  );
};
