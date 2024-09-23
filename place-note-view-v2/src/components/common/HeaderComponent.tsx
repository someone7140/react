"use client";

import { FC } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/solid";
import { IconButton, Navbar, Typography } from "@material-tailwind/react";

import { useSidebarOpen } from "@/hooks/globalStore/useSidebarOpen";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const HeaderComponent: FC = ({}) => {
  const { userAccount } = useAuthManagement();
  const { isSidebarOpen, setIsOpenSidebar } = useSidebarOpen();

  return (
    <>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none bg-cyan-50 px-3 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            <IconButton
              variant="text"
              size="lg"
              onClick={() => {
                setIsOpenSidebar(!isSidebarOpen);
              }}
            >
              {isSidebarOpen ? (
                <XMarkIcon className="h-8 w-8 stroke-2" />
              ) : (
                <Bars3Icon className="h-8 w-8 stroke-2" />
              )}
            </IconButton>
            <Typography variant="h5">Placeノート</Typography>
          </div>
          {userAccount && (
            <div className="flex items-center">
              {userAccount.imageUrl ? (
                <Image
                  src={userAccount.imageUrl}
                  width={35}
                  height={35}
                  alt={userAccount.name}
                  className="mr-3"
                />
              ) : (
                <UserIcon className="mr-3 w-[35px] h-[35px]" />
              )}
            </div>
          )}
        </div>
      </Navbar>
    </>
  );
};
