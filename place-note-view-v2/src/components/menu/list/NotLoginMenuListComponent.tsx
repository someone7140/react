"use client";

import { FC } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserPlusIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";

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
    <List className="gap-4 mt-2">
      <ListItem
        onClick={() => {
          onCLickMenu(TOP_PAGE_PATH);
        }}
      >
        <ListItemPrefix>
          <HomeIcon className="h-5 w-5" />
        </ListItemPrefix>
        Top
      </ListItem>
      <ListItem
        onClick={() => {
          onCLickMenu(LOGIN_PAGE_PATH);
        }}
      >
        <ListItemPrefix>
          <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
        </ListItemPrefix>
        ログイン
      </ListItem>
      <ListItem
        onClick={() => {
          updateUserAccountInputSession(undefined);
          onCLickMenu(USER_ACCOUNT_REGISTER_PAGE_PATH);
        }}
      >
        <ListItemPrefix>
          <UserPlusIcon className="h-5 w-5" />
        </ListItemPrefix>
        ユーザ登録
      </ListItem>
      <ListItem
        onClick={() => {
          onCLickMenu(INQUIRY_AND_OTHERS_PATH);
        }}
      >
        <ListItemPrefix>
          <EnvelopeIcon className="h-5 w-5" />
        </ListItemPrefix>
        問い合わせ等
      </ListItem>
    </List>
  );
};
