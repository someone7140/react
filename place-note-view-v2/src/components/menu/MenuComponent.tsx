"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";

import { LoggedInMenuListComponent } from "@/components/menu/list/LoggedInMenuListComponent";
import { NotLoginMenuListComponent } from "@/components/menu/list/NotLoginMenuListComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const MenuComponent: FC = ({}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userAccount } = useAuthManagement();
  const router = useRouter();

  const onCLickMenu = (path: string, reloadFlag?: boolean) => {
    if (reloadFlag) {
      window.location.href = path;
    } else {
      router.push(path);
    }
    onOpenChange();
  };

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        {isOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </div>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="left"
        size="xs"
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Menu</DrawerHeader>
              <DrawerBody>
                {!userAccount && (
                  <NotLoginMenuListComponent onCLickMenu={onCLickMenu} />
                )}
                {userAccount && (
                  <LoggedInMenuListComponent onCLickMenu={onCLickMenu} />
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
