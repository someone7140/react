"use client";

import React, { FC, ReactNode } from "react";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";
import { buttonStyle, toastStyle } from "@/styles/CommonStyle";
import { menuHeaderContainerStyle } from "@/styles/MenuStyle";

type Props = {
  children: ReactNode;
};

export const HeaderComponent: FC<Props> = ({ children }) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const authLocalStorage = useAuthTokenLocalStorage();

  const executeLogout = () => {
    authLocalStorage.removeAuthToken();
    authStore.removeUserAccount();
    toast({
      className: `${toastStyle({ textColor: "black" })}`,
      description: "ログアウトしました",
    });
    router.push("/");
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
          <NavigationMenuList className="flex gap-8">
            {topMenuItem}
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              <Link href="/">投稿管理</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                ユーザー管理
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[100px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[400px] ">
                  <li>
                    <div className="w-[100%] cursor-pointer">
                      <Link href="/">ユーザ情報編集</Link>
                    </div>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <div
                        className="w-[100%] cursor-pointer"
                        onClick={executeLogout}
                      >
                        ログアウト
                      </div>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
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
          <NavigationMenuList className="flex gap-8">
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
