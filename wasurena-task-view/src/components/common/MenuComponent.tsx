"use client";

import { FC, forwardRef } from "react";
import { IconMenu2 } from "@tabler/icons-react";
import { Menu, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import {
  LOGIN_PAGE_PATH,
  TOP_PAGE_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/constants/MenuPathConstants";

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
      <Menu.Dropdown>
        <Menu.Item component={NextLink} href={TOP_PAGE_PATH}>
          <span className="text-lg">Top</span>
        </Menu.Item>
        <Menu.Item component={NextLink} href={LOGIN_PAGE_PATH}>
          <span className="text-lg">ログイン</span>
        </Menu.Item>
        <Menu.Item component={NextLink} href={USER_ACCOUNT_REGISTER_PAGE_PATH}>
          <span className="text-lg">会員登録</span>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
