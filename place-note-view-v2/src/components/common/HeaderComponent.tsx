"use client";

import { FC } from "react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import { Navbar } from "@heroui/react";

import { MenuComponent } from "../menu/MenuComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const HeaderComponent: FC = ({}) => {
  const { userAccount } = useAuthManagement();

  return (
    <Navbar className="sticky top-0 z-10 h-[70px] rounded-none bg-cyan-50 py-3">
      <div className="flex items-center justify-between text-blue-gray-900 w-[100%]">
        <div className="flex items-center gap-6">
          <MenuComponent />
          <div className="text-2xl font-semibold">Placeノート</div>
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
  );
};
