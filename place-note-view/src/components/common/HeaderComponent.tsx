"use client";

import React, { FC, ReactNode } from "react";

import { Dropdown, FlowbiteNavbarRootTheme, Navbar } from "flowbite-react";
import { FlowbiteNavbarLinkTheme } from "flowbite-react/lib/esm/components/Navbar/NavbarLink";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

type Props = {
  children: ReactNode;
};

export const HeaderComponent: FC<Props> = ({ children }) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const { removeAuthToken } = useAuthTokenLocalStorage();

  const customNavRootTheme: FlowbiteNavbarRootTheme = {
    base: "fixed bg-cyan-100 px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 w-full z-50",
    rounded: {
      on: "rounded",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between",
      fluid: {
        on: "",
        off: "container",
      },
    },
  };

  const customLinkTheme: FlowbiteNavbarLinkTheme = {
    base: "block py-2 pr-4 pl-3 text-lg",
    active: {
      on: "bg-cyan-100 text-black dark:text-white hover:bg-blue-200",
      off: "bg-cyan-100",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  };

  const customLinkThemeDropDown: FlowbiteNavbarLinkTheme = {
    base: "block py-2 pr-4 pl-3 text-base w-64",
    active: {
      on: "bg-white text-black dark:text-white hover:bg-blue-200",
      off: "bg-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  };

  const topMenu = (
    <Navbar.Link active href="/" theme={customLinkTheme}>
      <p>Top</p>
    </Navbar.Link>
  );
  const userAccountLoginMenu = (
    <Navbar.Link active href="/userAccountLogin" theme={customLinkTheme}>
      <p>ログイン</p>
    </Navbar.Link>
  );
  const userAccountLogoutMenu = (
    <Navbar.Link
      active
      href="#"
      onClick={() => {
        // ログイン情報を削除
        removeAuthToken();
        authStore.removeUserAccount();
        toast("ログアウトしました");
        router.push("/");
      }}
      theme={customLinkTheme}
    >
      <p>ログアウト</p>
    </Navbar.Link>
  );
  const userAccountRegisterMenu = (
    <Navbar.Link active href="/userAccountRegister" theme={customLinkTheme}>
      <p>ユーザー登録</p>
    </Navbar.Link>
  );
  const userAccountRefMenu = (
    <Navbar.Link active href="/userAccountRef" theme={customLinkTheme}>
      <p>ユーザー情報</p>
    </Navbar.Link>
  );
  const postManagementMenu = (
    <Navbar.Link theme={customLinkTheme}>
      <Dropdown
        inline
        label="投稿管理"
        className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
      >
        <Navbar.Link active href="/myPostAdd" theme={customLinkThemeDropDown}>
          <p>投稿追加</p>
        </Navbar.Link>
        <Navbar.Link active href="/myCategory" theme={customLinkThemeDropDown}>
          <p>カテゴリー管理</p>
        </Navbar.Link>
      </Dropdown>
    </Navbar.Link>
  );

  return (
    <>
      <Navbar fluid rounded theme={customNavRootTheme}>
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            私の訪問記録
          </span>
        </Navbar.Brand>

        {authStore?.userAccount && (
          <>
            <div className="flex md:order-2">
              <svg
                className="w-[37px] h-[37px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 18"
              >
                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse>
              {topMenu}
              {postManagementMenu}
              {userAccountRefMenu}
              {userAccountLogoutMenu}
            </Navbar.Collapse>
          </>
        )}
        {!authStore?.userAccount && (
          <>
            <div className="flex md:order-2"></div>
            <Navbar.Toggle />
            <Navbar.Collapse>
              {topMenu}
              {userAccountLoginMenu}
              {userAccountRegisterMenu}
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
      <div className="pt-20">{children}</div>
    </>
  );
};
