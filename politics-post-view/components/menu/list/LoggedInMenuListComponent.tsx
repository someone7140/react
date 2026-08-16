"use client";

import { FC } from "react";
import { Accordion, toast } from "@heroui/react";
import { Icon } from "@iconify/react";

import {
  POST_ADD_PAGE_PATH,
  POST_MY_LIST_PAGE_PATH,
  TOP_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { menuStyle } from "@/style/MenuStyle";

type Props = {
  onCLickMenu: (path: string, reloadFlag?: boolean) => void;
};

export const LoggedInMenuListComponent: FC<Props> = ({ onCLickMenu }) => {
  const { userAccount, removeAuthInfo } = useAuthManagement();

  return (
    <div className="flex flex-col gap-3">
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          onCLickMenu(TOP_PAGE_PATH);
        }}
      >
        <Icon
          icon="lucide:home"
          width="16"
          height="16"
          style={{ color: "#000000" }}
        />
        <div className="text-xl ml-3">Top</div>
      </div>
      <Accordion>
        <Accordion.Item key="posts">
          <Accordion.Heading>
            <Accordion.Trigger className={`p-0`}>
              <div className={menuStyle({ type: "marginLeft" })}>
                <Icon
                  icon="mdi:file-document-multiple-outline"
                  width="15"
                  height="15"
                  style={{ color: "#000000" }}
                />
                <div className="text-xl ml-3">投稿管理</div>
              </div>
              <Accordion.Indicator className="w-7 h-7">
                <Icon icon="mdi:chevron-down" style={{ color: "#787E7D" }} />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>
              <div className="flex flex-col gap-3 mt-2">
                <div
                  className={menuStyle({ type: "marginLeft" })}
                  onClick={() => {
                    onCLickMenu(POST_ADD_PAGE_PATH);
                  }}
                >
                  <Icon
                    icon="mdi:file-document-plus-outline"
                    width="18"
                    height="18"
                    style={{ color: "#000000" }}
                  />
                  <div className="text-lg ml-3">投稿追加</div>
                </div>
                <div
                  className={menuStyle({ type: "marginLeft" })}
                  onClick={() => {
                    onCLickMenu(POST_MY_LIST_PAGE_PATH);
                  }}
                >
                  <Icon
                    icon="clarity:list-line"
                    width="18"
                    height="18"
                    style={{ color: "#000000" }}
                  />
                  <div className="text-lg ml-3">自投稿一覧</div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <div
        className={menuStyle({ type: "marginLeft" })}
        onClick={() => {
          removeAuthInfo();
          onCLickMenu(TOP_PAGE_PATH);
          toast.success("ログアウトしました。");
        }}
      >
        <Icon
          icon="material-symbols:logout"
          width="16"
          height="16"
          style={{ color: "#000000" }}
        />
        <div className="text-xl ml-3">ログアウト</div>
      </div>
    </div>
  );
};
