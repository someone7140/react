"use client";

import { FC } from "react";
import {
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import {
  DocumentIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  FolderIcon,
  FolderPlusIcon,
  HomeIcon,
  IdentificationIcon,
  PencilIcon,
  PowerIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import {
  INQUIRY_AND_OTHERS,
  POST_ADD_PAGE_PATH,
  POST_CATEGORY_ADD_PAGE_PATH,
  POST_CATEGORY_LIST_PAGE_PATH,
  POST_LIST_PAGE_PATH,
  POST_PLACE_ADD_PAGE_PATH,
  POST_PLACE_LIST_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_EDIT_PAGE_PATH,
  USER_ACCOUNT_PROFILE,
} from "@/constants/MenuPathConstants";
import { useAuthManagement } from "@/hooks/useAuthManagement";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const LoggedInMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  const { userAccount } = useAuthManagement();
  const { removeAuthInfo } = useAuthManagement();

  return (
    <List className="mt-2">
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
      <ListItem className="cursor-default hover:bg-white pb-1">
        <ListItemPrefix>
          <RectangleStackIcon className="h-5 w-5" />
        </ListItemPrefix>
        投稿管理
      </ListItem>
      <div className="ml-4">
        <ListItem
          onClick={() => {
            onCLickMenu(POST_LIST_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <DocumentIcon className="h-5 w-5" />
          </ListItemPrefix>
          投稿一覧
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_ADD_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <DocumentPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          投稿追加
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_CATEGORY_LIST_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          カテゴリー一覧
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_CATEGORY_ADD_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <FolderPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          カテゴリー追加
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_PLACE_LIST_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <MagnifyingGlassIcon className="h-5 w-5" />
          </ListItemPrefix>
          場所一覧
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_PLACE_ADD_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <MagnifyingGlassPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          場所追加
        </ListItem>
      </div>
      <ListItem className="cursor-default hover:bg-white pb-1">
        <ListItemPrefix>
          <RectangleStackIcon className="h-5 w-5" />
        </ListItemPrefix>
        プロフィール管理
      </ListItem>
      <div className="ml-4">
        <ListItem
          onClick={() => {
            onCLickMenu(
              `${USER_ACCOUNT_PROFILE}?userSettingId=${userAccount?.userSettingId}`
            );
          }}
        >
          <ListItemPrefix>
            <IdentificationIcon className="h-5 w-5" />
          </ListItemPrefix>
          公開プロフィール
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(USER_ACCOUNT_EDIT_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <PencilIcon className="h-5 w-5" />
          </ListItemPrefix>
          プロフィール情報編集
        </ListItem>
      </div>
      <ListItem
        onClick={() => {
          removeAuthInfo();
          onCLickMenu(TOP_PAGE_PATH, true);
        }}
      >
        <ListItemPrefix>
          <PowerIcon className="h-5 w-5" />
        </ListItemPrefix>
        ログアウト
      </ListItem>
      <ListItem
        onClick={() => {
          onCLickMenu(INQUIRY_AND_OTHERS);
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
