"use client";

import { FC } from "react";
import Image from "next/image";
import { useAtomValue } from "jotai";
import { IconUserFilled } from "@tabler/icons-react";

import { MenuComponent } from "./MenuComponent";
import { userAccountAtom } from "@/atoms/jotaiAtoms";

export const HeaderComponent: FC = ({}) => {
  const userAccountState = useAtomValue(userAccountAtom);

  return (
    <header className="sticky top-0 z-10 h-[60px] max-w-full rounded-none bg-cyan-50 px-3 py-3 mb-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 h-[35px]">
          <div>
            <MenuComponent />
          </div>
          <div className="text-lg">わすれなタスク</div>
        </div>
        {userAccountState && (
          <div className="mr-3">
            {userAccountState.imageUrl && (
              <Image
                src={userAccountState.imageUrl}
                width={35}
                height={35}
                alt={userAccountState.userName}
              />
            )}
            {!userAccountState.imageUrl && (
              <div className="mr-3">
                <IconUserFilled size={32} />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
