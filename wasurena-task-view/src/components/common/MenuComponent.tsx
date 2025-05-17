"use client";

import { FC, forwardRef } from "react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, UnstyledButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconMenu2 } from "@tabler/icons-react";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import {
  CATEGORY_LIST_PAGE_PATH,
  CATEGORY_REGISTER_PAGE_PATH,
  LOGIN_PAGE_PATH,
  TASK_CHECK_LIST_PAGE_PATH,
  TASK_DEFINITION_LIST_PAGE_PATH,
  TASK_REGISTER_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_NOTIFY_SETTING_PAGE_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { useAuthManagement } from "@/hooks/useAuthManagement";

const CustomMenuButton = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ ...props }: React.ComponentPropsWithoutRef<"button">, ref) => (
  <UnstyledButton ref={ref} {...props}>
    <IconMenu2 size={32} className="cursor-pointer" />
  </UnstyledButton>
));
CustomMenuButton.displayName = "CustomMenuButton";

export const NextLink = forwardRef(
  (
    { href, ...others }: React.ComponentPropsWithoutRef<typeof Link>,
    ref: React.ForwardedRef<HTMLAnchorElement>
  ) => <Link href={href} {...others} ref={ref}></Link>
);
NextLink.displayName = "nextLink";

export const MenuComponent: FC = ({}) => {
  const userAccountState = useAtomValue(userAccountAtom);
  const { clearUserAccountState } = useAuthManagement();
  const router = useRouter();

  const onClickLogout = () => {
    clearUserAccountState();
    notifications.show({
      id: "logout-success",
      position: "top-center",
      withCloseButton: true,
      autoClose: 5000,
      title: "ログアウト",
      message: "ログアウトしました。",
      color: "blue",
      loading: false,
    });
    router.push(`${TOP_PAGE_PATH}`);
  };

  return (
    <Menu
      position="bottom-start"
      offset={3}
      width={250}
      styles={{
        item: {
          marginBottom: "12px",
        },
      }}
    >
      <Menu.Target>
        <CustomMenuButton />
      </Menu.Target>

      {userAccountState && (
        <Menu.Dropdown>
          <Menu.Item component={NextLink} href={TOP_PAGE_PATH}>
            <span className="text-lg">Top</span>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>
            <span className="text-base">タスク管理</span>
          </Menu.Label>
          <Menu.Item component={NextLink} href={TASK_CHECK_LIST_PAGE_PATH}>
            <span className="text-lg">タスクチェック対象一覧</span>
          </Menu.Item>
          <Menu.Item component={NextLink} href={TASK_DEFINITION_LIST_PAGE_PATH}>
            <span className="text-lg">タスク定義一覧</span>
          </Menu.Item>
          <Menu.Item component={NextLink} href={TASK_REGISTER_PAGE_PATH}>
            <span className="text-lg">タスク登録</span>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>
            <span className="text-base">タスクカテゴリー管理</span>
          </Menu.Label>
          <Menu.Item component={NextLink} href={CATEGORY_REGISTER_PAGE_PATH}>
            <span className="text-lg">カテゴリー登録</span>
          </Menu.Item>
          <Menu.Item component={NextLink} href={CATEGORY_LIST_PAGE_PATH}>
            <span className="text-lg">カテゴリー一覧</span>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>
            <span className="text-base">ユーザ管理</span>
          </Menu.Label>
          <Menu.Item
            component={NextLink}
            href={USER_ACCOUNT_NOTIFY_SETTING_PAGE_PATH}
          >
            <span className="text-lg">LINE通知設定</span>
          </Menu.Item>
          <Menu.Item onClick={onClickLogout}>
            <span className="text-lg">ログアウト</span>
          </Menu.Item>
        </Menu.Dropdown>
      )}

      {!userAccountState && (
        <Menu.Dropdown>
          <Menu.Item component={NextLink} href={TOP_PAGE_PATH}>
            <span className="text-lg">Top</span>
          </Menu.Item>
          <Menu.Item component={NextLink} href={LOGIN_PAGE_PATH}>
            <span className="text-lg">ログイン</span>
          </Menu.Item>
          <Menu.Item
            component={NextLink}
            href={USER_ACCOUNT_REGISTER_PAGE_PATH}
          >
            <span className="text-lg">会員登録</span>
          </Menu.Item>
        </Menu.Dropdown>
      )}
    </Menu>
  );
};
