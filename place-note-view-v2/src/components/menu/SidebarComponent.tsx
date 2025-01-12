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
          className="h-[calc(100vh-2rem)] w-full pl-4 pr-4 pt-2"
        >
          <div className="flex items-center justify-between">
            <Typography variant="h4">Menu</Typography>
            <IconButton
              variant="text"
              size="lg"
              onClick={() => {
                setIsOpenSidebar(false);
              }}
            >
              <XMarkIcon className="h-7 w-7 stroke-2" />
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
