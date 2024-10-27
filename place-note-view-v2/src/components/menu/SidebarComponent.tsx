"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Card, Drawer, IconButton, Typography } from "@material-tailwind/react";

import { LoggedInMenuListComponent } from "@/components/menu/list/LoggedInMenuListComponent";
import { NotLoginMenuListComponent } from "@/components/menu/list/NotLoginMenuListComponent";
import { useSidebarOpen } from "@/hooks/globalStore/useSidebarOpen";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const SidebarComponent: FC = ({}) => {
  const { isSidebarOpen, setIsOpenSidebar } = useSidebarOpen();
  const { userAccount } = useAuthManagement();
  const router = useRouter();

  const onCLickMenu = (path: string, reloadFlag?: boolean) => {
    setIsOpenSidebar(false);
    if (reloadFlag) {
      window.location.href = path;
    } else {
      router.push(path);
    }
  };

  return (
    <>
      <Drawer
        open={isSidebarOpen}
        onClose={() => {
          setIsOpenSidebar(false);
        }}
        overlay={false}
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="flex items-center justify-between">
            <Typography variant="h5">メニュー</Typography>
            <IconButton
              variant="text"
              size="lg"
              onClick={() => {
                setIsOpenSidebar(false);
              }}
            >
              <XMarkIcon className="h-8 w-8 stroke-2" />
            </IconButton>
          </div>

          {!userAccount && (
            <NotLoginMenuListComponent onCLickMenu={onCLickMenu} />
          )}
          {userAccount && (
            <LoggedInMenuListComponent onCLickMenu={onCLickMenu} />
          )}
        </Card>
      </Drawer>
    </>
  );
};
