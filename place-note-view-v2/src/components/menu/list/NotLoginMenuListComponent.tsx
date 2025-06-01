"use client";

import { FC } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserPlusIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { MenuItem } from "@szhsin/react-menu";

import {
  INQUIRY_AND_OTHERS_PATH,
  LOGIN_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { useUserAccountInputSessionStore } from "@/hooks/inputSessionStore/useUserAccountInputSessionStore";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const NotLoginMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  const { updateUserAccountInputSession } = useUserAccountInputSessionStore();

  return (
    <div className="flex flex-col gap-1">
      <MenuItem
        onClick={() => {
          onCLickMenu(TOP_PAGE_PATH);
        }}
      >
        <HomeIcon className="h-5 w-5" />
        <div className="text-xl ml-3">Top</div>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onCLickMenu(LOGIN_PAGE_PATH);
        }}
      >
        <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
        <div className="text-xl ml-3">ログイン</div>
      </MenuItem>
      <MenuItem
        onClick={() => {
          updateUserAccountInputSession(undefined);
          onCLickMenu(USER_ACCOUNT_REGISTER_PAGE_PATH);
        }}
      >
        <UserPlusIcon className="h-5 w-5" />
        <div className="text-xl ml-3">ユーザ登録</div>
      </MenuItem>
      <MenuItem
        onClick={() => {
          onCLickMenu(INQUIRY_AND_OTHERS_PATH);
        }}
      >
        <EnvelopeIcon className="h-5 w-5" />
        <div className="text-xl ml-3">問い合わせ等</div>
      </MenuItem>
    </div>
  );
};
