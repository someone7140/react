"use client";

import { FC } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserPlusIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

import {
  INQUIRY_AND_OTHERS_PATH,
  LOGIN_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { useUserAccountInputSessionStore } from "@/hooks/inputSessionStore/useUserAccountInputSessionStore";
import { menuStyle } from "@/style/MenuStyle";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const NotLoginMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  const { updateUserAccountInputSession } = useUserAccountInputSessionStore();

  return (
    <div className="flex flex-col gap-5">
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          onCLickMenu(TOP_PAGE_PATH);
        }}
      >
        <HomeIcon className="h-5 w-5" />
        <div className="text-xl ml-3">Top</div>
      </div>
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          onCLickMenu(LOGIN_PAGE_PATH);
        }}
      >
        <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
        <div className="text-xl ml-3">ログイン</div>
      </div>
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          updateUserAccountInputSession(undefined);
          onCLickMenu(USER_ACCOUNT_REGISTER_PAGE_PATH);
        }}
      >
        <UserPlusIcon className="h-5 w-5" />
        <div className="text-xl ml-3">ユーザ登録</div>
      </div>
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          onCLickMenu(INQUIRY_AND_OTHERS_PATH);
        }}
      >
        <EnvelopeIcon className="h-5 w-5" />
        <div className="text-xl ml-3">問い合わせ等</div>
      </div>
    </div>
  );
};
