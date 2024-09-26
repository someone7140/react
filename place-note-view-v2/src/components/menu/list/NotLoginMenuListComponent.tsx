"use client";

import { FC } from "react";
import {
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import {
  LOGIN_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/components/menu/constants/MenuPathConstants";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const NotLoginMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
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
          onCLickMenu(USER_ACCOUNT_REGISTER_PAGE_PATH);
        }}
      >
        <ListItemPrefix>
          <UserPlusIcon className="h-5 w-5" />
        </ListItemPrefix>
        ユーザ登録
      </ListItem>
    </List>
  );
};
