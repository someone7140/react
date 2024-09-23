"use client";

import { FC } from "react";
import {
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  DocumentIcon,
  DocumentPlusIcon,
  FolderIcon,
  FolderPlusIcon,
  HomeIcon,
  PencilIcon,
  PowerIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";

import {
  POST_ADD_PAGE_PATH,
  POST_CATEGORY_ADD_PAGE_PATH,
  POST_CATEGORY_LIST_PAGE_PATH,
  POST_LIST_PAGE_PATH,
  POST_PLACE_ADD_PAGE_PATH,
  POST_PLACE_LIST_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_EDIT_PAGE_PATH,
} from "@/components/menu/constants/MenuPathConstants";
import { useAuthManagement } from "@/hooks/useAuthManagement";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const LoggedInMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  const { removeAuthInfo } = useAuthManagement();

  return (
    <List className="gap-2 mt-2">
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
      <ListItem className="cursor-default hover:bg-white">
        <ListItemPrefix>
          <RectangleStackIcon className="h-5 w-5" />
        </ListItemPrefix>
        <Typography color="blue-gray" className="mr-auto font-normal">
          投稿管理
        </Typography>
        <ListItemSuffix>
          <ChevronDownIcon className="h-5 w-5" />
        </ListItemSuffix>
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
          <Typography color="blue-gray" className="mr-auto font-normal">
            投稿一覧
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_ADD_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <DocumentPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            投稿追加
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_CATEGORY_LIST_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <FolderIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            カテゴリー一覧
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_CATEGORY_ADD_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <FolderPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            カテゴリー追加
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_PLACE_LIST_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <MagnifyingGlassIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            場所一覧
          </Typography>
        </ListItem>
        <ListItem
          onClick={() => {
            onCLickMenu(POST_PLACE_ADD_PAGE_PATH);
          }}
        >
          <ListItemPrefix>
            <MagnifyingGlassPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal">
            場所追加
          </Typography>
        </ListItem>
      </div>
      <ListItem
        onClick={() => {
          onCLickMenu(USER_ACCOUNT_EDIT_PAGE_PATH);
        }}
      >
        <ListItemPrefix>
          <PencilIcon className="h-5 w-5" />
        </ListItemPrefix>
        ユーザ情報編集
      </ListItem>
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
    </List>
  );
};
