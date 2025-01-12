"use client";

import React, { FC } from "react";
import Link from "next/link";

import { InstagramComponent } from "./InstagramComponent";
import { WebNoInfoComponent } from "./WebNoInfoComponent";
import { WebWithInfoComponent } from "./WebWithInfoComponent";
import { XContentsComponent } from "./XContentsComponent";
import {
  URL_TYPE_INSTAGRAM,
  URL_TYPE_WEB_WITH_INFO,
  URL_TYPE_X,
} from "@/constants/UrlConstants";
import { PostResponse } from "@/graphql/gen/graphql";
import { detailTextStyle } from "@/style/PostStyle";

type Props = {
  post: PostResponse;
  isDisplayUserInfo?: boolean;
};

export const OpenPostRefComponent: FC<Props> = ({ post }) => {
  return (
    <div className="min-w-[300px] border p-3">
      <div className={"text-wrap break-all text-black text-2xl"}>
        {post.title}
      </div>
      <div className={"flex gap-2"}>
        <div>場所:</div>
        {!post.postPlace.url && <div>{post.postPlace.name}</div>}
        {post.postPlace.url && (
          <div>
            <Link
              href={post.postPlace.url}
              rel="noopener noreferrer"
              target="_blank"
              className="underline text-blue-600 hover:text-blue-800"
            >
              {post.postPlace.name}
            </Link>
          </div>
        )}
      </div>
      <div className={"flex gap-2"}>
        <div>訪問日:</div>
        <div>
          {new Date(post.visitedDateStr).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      </div>
      <div className={`${detailTextStyle()} ml-1`}>{post.detail}</div>
      <div className="flex flex-col gap-3 mt-2">
        {post.urlList.map((url, i) => {
          if (url.urlType === URL_TYPE_WEB_WITH_INFO) {
            return <WebWithInfoComponent key={i} url={url} />;
          }
          if (url.urlType === URL_TYPE_X) {
            return <XContentsComponent key={i} url={url} />;
          }
          if (url.urlType === URL_TYPE_INSTAGRAM) {
            return <InstagramComponent key={i} url={url} />;
          }
          return <WebNoInfoComponent key={i} url={url} />;
        })}
      </div>
    </div>
  );
};
