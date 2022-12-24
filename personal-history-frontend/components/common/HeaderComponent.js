import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useSharedState } from "../../services/state/StateService";

export default function HeaderComponent() {
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  function menuItemRender(href, label) {
    return (
      <MenuItem style={{ padding: "0 0 0 0" }}>
        <Link href={href} className="block">
          <span className="pl-6 mt-1 w-44 h-8">{label}</span>
        </Link>
      </MenuItem>
    );
  }

  return (
    <div className="sticky top-0 z-50">
      <Head>
        <title>私の履歴書</title>
      </Head>
      <div className="h-12 w-screen bg-lime-400 mb-4 flex justify-between items-center">
        <div className="ml-2">
          <Menu
            menuButton={
              <MenuButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </MenuButton>
            }
            transition
            offsetY={10}
          >
            {menuItemRender("/", "Top")}
            {!loginAuthSharedState && (
              <>
                {menuItemRender("/auth/login", "ログイン")}
                {menuItemRender("/auth/auth_account_register", "会員登録")}
              </>
            )}
            {loginAuthSharedState && (
              <>
                {menuItemRender("/history/my_history_list", "経歴登録")}
                {menuItemRender(
                  "/history_category/category_list",
                  "経歴カテゴリー登録"
                )}
                {menuItemRender("/account/account_edit", "会員情報編集")}
                {loginAuthSharedState.authMethod == "email" && (
                  <>
                    {menuItemRender("/auth/change_password", "パスワード変更")}
                  </>
                )}
                {loginAuthSharedState.isAdmin && (
                  <>
                    {menuItemRender(
                      "/announcement/announcement_manage",
                      "お知らせ管理"
                    )}
                  </>
                )}
                {menuItemRender("/auth/logout", "ログアウト")}
              </>
            )}
          </Menu>
        </div>
        <div>私の履歴書</div>
        <div className="mr-2">
          {loginAuthSharedState && (
            <>
              {loginAuthSharedState.iconImageUrl && (
                <img
                  src={loginAuthSharedState.iconImageUrl}
                  className="w-10 h-10"
                />
              )}
              {!loginAuthSharedState.iconImageUrl && (
                <FontAwesomeIcon icon={faUser} className="w-10 h-10" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
