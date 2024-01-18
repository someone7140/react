"use client";

import React, { FC, ReactNode } from "react";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { toast } from "@/components/ui/use-toast";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";
import {
  menuHeaderContainerStyle,
  menuHeaderNavigationMenuRecordStyle,
} from "@/styles/MenuStyle";

type Props = {
  children: ReactNode;
};

export const HeaderComponent: FC<Props> = ({ children }) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const { removeAuthInfo } = useAuthManagement();

  const executeLogout = () => {
    removeAuthInfo();
    window.location.href = "/";
  };

  const topMenuItem = (
    <NavigationMenuItem className={navigationMenuTriggerStyle()}>
      <Link href="/">
        <NavigationMenuLink>Top</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );

  const renderMenuLoggedIn = () => {
    return (
      <div className={menuHeaderContainerStyle()}>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {topMenuItem}
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${navigationMenuTriggerStyle()} border-none`}
                  >
                    管理メニュー
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <div
                        className={menuHeaderNavigationMenuRecordStyle()}
                        onClick={() => {
                          router.push("/");
                        }}
                      >
                        課題テーマ一覧
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div
                        className={menuHeaderNavigationMenuRecordStyle()}
                        onClick={() => {
                          router.push("/prompt/addThemeAndQuestion");
                        }}
                      >
                        課題テーマ・質問作成
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <div
                        className={menuHeaderNavigationMenuRecordStyle()}
                        onClick={() => {
                          router.push("/");
                        }}
                      >
                        ユーザ情報編集
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div
                        className={menuHeaderNavigationMenuRecordStyle()}
                        onClick={executeLogout}
                      >
                        ログアウト
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <CircleUserRound className="mt-1" size={"32px"} />
      </div>
    );
  };

  const renderMenuNotLogIn = () => {
    return (
      <div className={menuHeaderContainerStyle()}>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {topMenuItem}
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link href="/userAccount/register">ユーザー登録</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          onClick={() => {
            router.push("/userAccount/login");
          }}
          className={buttonStyle({ color: "indigo" })}
        >
          <p>ログイン</p>
        </Button>
      </div>
    );
  };

  return (
    <div>
      <header className="sticky top-0 z-[50] mb-2 w-[100%] bg-slate-100 flex justify-center">
        <div className="flex items-center h-14 ml-2 w-[100%] max-w-xl">
          {authStore.userAccount && <>{renderMenuLoggedIn()}</>}
          {!authStore.userAccount && <>{renderMenuNotLogIn()}</>}
        </div>
      </header>
      {children}
    </div>
  );
};
