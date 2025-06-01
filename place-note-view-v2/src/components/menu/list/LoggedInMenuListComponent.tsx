"use client";

import { FC } from "react";
import {
  MagnifyingGlassIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import {
  DocumentIcon,
  DocumentMagnifyingGlassIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  IdentificationIcon,
  MapIcon,
  PencilIcon,
  PowerIcon,
  RectangleStackIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { MenuItem, SubMenu } from "@szhsin/react-menu";

import {
  INQUIRY_AND_OTHERS_PATH,
  POST_ADD_PAGE_PATH,
  POST_CATEGORY_ADD_PAGE_PATH,
  POST_CATEGORY_LIST_PAGE_PATH,
  POST_LIST_PAGE_PATH,
  POST_PLACE_ADD_PAGE_PATH,
  POST_PLACE_LIST_PAGE_PATH,
  POST_SEARCH_LOCATION_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_EDIT_PAGE_PATH,
  USER_ACCOUNT_PROFILE,
} from "@/constants/MenuPathConstants";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { usePostPlaceInputSessionStore } from "@/hooks/inputSessionStore/usePostPlaceInputSessionStore";
import { usePostCategoryInputSessionStore } from "@/hooks/inputSessionStore/usePostCategoryInputSessionStore";
import { usePostInputSessionStore } from "@/hooks/inputSessionStore/usePostSessionStore";
import { useUserAccountInputSessionStore } from "@/hooks/inputSessionStore/useUserAccountInputSessionStore";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const LoggedInMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  const { userAccount } = useAuthManagement();
  const { removeAuthInfo } = useAuthManagement();
  const { updatePostPlaceInputSession } = usePostPlaceInputSessionStore();
  const { updatePostCategoryInputSession } = usePostCategoryInputSessionStore();
  const { updatePostInputSession } = usePostInputSessionStore();
  const { updateUserAccountInputSession } = useUserAccountInputSessionStore();

  return (
    <div className="flex flex-col gap-1 z-99999999">
      <MenuItem
        onClick={() => {
          onCLickMenu(TOP_PAGE_PATH);
        }}
      >
        <HomeIcon className="h-5 w-5" />
        <div className="text-xl ml-3">Top</div>
      </MenuItem>
      <SubMenu
        label={
          <div className="flex">
            <RectangleStackIcon className="h-5 w-5" />
            <div className="text-xl ml-3">投稿管理</div>
          </div>
        }
      >
        <MenuItem
          onClick={() => {
            onCLickMenu(POST_LIST_PAGE_PATH);
          }}
        >
          <DocumentIcon className="h-5 w-5" />
          <div className="text-lg ml-3">投稿一覧</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            updatePostInputSession(undefined);
            onCLickMenu(POST_ADD_PAGE_PATH);
          }}
        >
          <DocumentPlusIcon className="h-5 w-5" />
          <div className="text-lg ml-3">投稿追加</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onCLickMenu(POST_SEARCH_LOCATION_PAGE_PATH);
          }}
        >
          <MapIcon className="h-5 w-5" />
          <div className="text-lg ml-3">投稿位置検索</div>
        </MenuItem>
      </SubMenu>
      <SubMenu
        label={
          <div className="flex">
            <TagIcon className="h-5 w-5" />
            <div className="text-xl ml-3">カテゴリー管理</div>
          </div>
        }
      >
        <MenuItem
          onClick={() => {
            onCLickMenu(POST_CATEGORY_LIST_PAGE_PATH);
          }}
        >
          <FolderIcon className="h-5 w-5" />
          <div className="text-lg ml-3">カテゴリー一覧</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            updatePostCategoryInputSession(undefined);
            onCLickMenu(POST_CATEGORY_ADD_PAGE_PATH);
          }}
        >
          <DocumentPlusIcon className="h-5 w-5" />
          <div className="text-lg ml-3">カテゴリー追加</div>
        </MenuItem>
      </SubMenu>
      <SubMenu
        label={
          <div className="flex">
            <DocumentMagnifyingGlassIcon className="h-5 w-5" />
            <div className="text-xl ml-3">場所管理</div>
          </div>
        }
      >
        <MenuItem
          onClick={() => {
            onCLickMenu(POST_PLACE_LIST_PAGE_PATH);
          }}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          <div className="text-lg ml-3">場所一覧</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            updatePostPlaceInputSession(undefined);
            onCLickMenu(POST_PLACE_ADD_PAGE_PATH);
          }}
        >
          <MagnifyingGlassPlusIcon className="h-5 w-5" />
          <div className="text-lg ml-3">場所追加</div>
        </MenuItem>
      </SubMenu>
      <SubMenu
        label={
          <div className="flex">
            <RectangleStackIcon className="h-5 w-5" />
            <div className="text-xl ml-3">プロフィール管理</div>
          </div>
        }
      >
        <MenuItem
          onClick={() => {
            onCLickMenu(
              `${USER_ACCOUNT_PROFILE}?userSettingId=${userAccount?.userSettingId}`
            );
          }}
        >
          <IdentificationIcon className="h-5 w-5" />
          <div className="text-lg ml-3">公開プロフィール</div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            updateUserAccountInputSession(undefined);
            onCLickMenu(USER_ACCOUNT_EDIT_PAGE_PATH);
          }}
        >
          <PencilIcon className="h-5 w-5" />
          <div className="text-lg ml-3">プロフィール情報編集</div>
        </MenuItem>
      </SubMenu>
      <MenuItem
        onClick={() => {
          removeAuthInfo();
          onCLickMenu(TOP_PAGE_PATH, true);
        }}
      >
        <PowerIcon className="h-5 w-5" />
        <div className="text-xl ml-3">ログアウト</div>
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
