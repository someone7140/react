"use client";

import { FC } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

import { MenuComponent } from "../menu/MenuComponent";
import { useAuthManagement } from "@/hooks/useAuthManagement";

export const HeaderComponent: FC = ({}) => {
  const { userAccount } = useAuthManagement();

  return (
    <div className="sticky top-0 z-10 h-[65px] rounded-none bg-cyan-50 py-3">
      <div className="flex items-center justify-between text-blue-gray-900 w-[100%]">
        <div className="flex items-center gap-6 ml-4">
          <MenuComponent />
          <div className="text-2xl font-semibold">Politics Post</div>
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
              <Icon
                icon="mdi:account"
                width="35"
                height="35"
                style={{ color: "#000000" }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
