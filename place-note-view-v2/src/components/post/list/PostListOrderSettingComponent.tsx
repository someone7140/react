"use client";

import React, { FC } from "react";

import { orderButtonStyle } from "@/style/PostStyle";

export type Props = {
  isOrderPostDate: boolean;
  switchOrderPostDate: (isOrderPostDate: boolean) => void;
};

export const PostListOrderSettingComponent: FC<Props> = ({
  isOrderPostDate,
  switchOrderPostDate,
}) => {
  return (
    <div className="flex flex-row mt-1 items-center">
      <div
        className={`${orderButtonStyle({
          type: isOrderPostDate ? "notSelected" : "selected",
        })} w-[70px]`}
        onClick={() => {
          switchOrderPostDate(false);
        }}
      >
        訪問日順
      </div>
      <div
        className={`${orderButtonStyle({
          type: isOrderPostDate ? "selected" : "notSelected",
        })} w-[70px]`}
        onClick={() => {
          switchOrderPostDate(true);
        }}
      >
        投稿日順
      </div>
    </div>
  );
};
