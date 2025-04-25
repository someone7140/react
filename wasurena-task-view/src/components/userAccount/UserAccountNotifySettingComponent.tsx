"use client";

import React, { FC } from "react";
import Link from "next/link";

import { linkStyle } from "@/style/commonStyle";

export const UserAccountNotifySettingComponent: FC = ({}) => {
  return (
    <div>
      通知設定をONにする場合、
      <Link
        href={process.env.NEXT_PUBLIC_LINE_NOTIFY_ACCOUNT_URL ?? ""}
        rel="noopener noreferrer"
        target="_blank"
        className={`${linkStyle()}`}
      >
        こちら
      </Link>
      から通知用アカウントの友だち登録をお願いします
    </div>
  );
};
