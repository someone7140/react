"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "@heroui/react";

import { LoggedInMenuListComponent } from "@/components/menu/list/LoggedInMenuListComponent";
import { NotLoginMenuListComponent } from "@/components/menu/list/NotLoginMenuListComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { Icon } from "@iconify/react";

export const MenuComponent: FC = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userAccount } = useAuthManagement();
  const router = useRouter();

  const onCLickMenu = (path: string, reloadFlag?: boolean) => {
    if (reloadFlag) {
      window.location.href = path;
    } else {
      router.push(path);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="cursor-pointer"
      >
        {isOpen ? (
          <Icon
            icon="material-symbols:close"
            width="30"
            height="30"
            style={{ color: "#000000" }}
          />
        ) : (
          <Icon
            icon="lucide:menu"
            width="30"
            height="30"
            style={{ color: "#000000" }}
          />
        )}
      </div>
      <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Menu</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {!userAccount && (
                <NotLoginMenuListComponent onCLickMenu={onCLickMenu} />
              )}
              {userAccount && (
                <LoggedInMenuListComponent onCLickMenu={onCLickMenu} />
              )}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </>
  );
};
