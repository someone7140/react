"use client";

import React, { FC } from "react";
import Link from "next/link";
import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { linkStyle } from "@/style/commonStyle";

export const UserAccountNotifySettingComponent: FC = ({}) => {
  const [userAccountState] = useAtom(userAccountAtom);

  return (
    <div className="max-w-[95%]">
      {userAccountState?.isLineBotFollow && (
        <>
          通知設定は有効です。無効にする場合は通知用アカウントをブロックしてください。
        </>
      )}
      {!userAccountState?.isLineBotFollow && (
        <>
          LINE通知を利用する場合、
          <Link
            href={process.env.NEXT_PUBLIC_LINE_NOTIFY_ACCOUNT_URL ?? ""}
            rel="noopener noreferrer"
            target="_blank"
            className={`${linkStyle()}`}
          >
            こちら
          </Link>
          から通知用アカウントの友だち登録をお願いします。
        </>
      )}
    </div>
  );
};
