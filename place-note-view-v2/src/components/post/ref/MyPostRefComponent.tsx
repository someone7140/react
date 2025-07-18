"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

import { InstagramComponent } from "./InstagramComponent";
import { WebNoInfoComponent } from "./WebNoInfoComponent";
import { WebWithInfoComponent } from "./WebWithInfoComponent";
import { XContentsComponent } from "./XContentsComponent";
import { PostDeleteDialogComponent } from "../dialog/PostDeleteDialogComponent";
import { MapModalByLatLonComponent } from "@/components/map/MapModalByLatLonComponent";
import { POST_EDIT_PAGE_PATH } from "@/constants/MenuPathConstants";
import {
  URL_TYPE_INSTAGRAM,
  URL_TYPE_WEB_WITH_INFO,
  URL_TYPE_X,
} from "@/constants/UrlConstants";
import { usePostInputSessionStore } from "@/hooks/inputSessionStore/usePostSessionStore";
import { useGeolocationService } from "@/hooks/geolocation/useGeolocationService";
import { PostCategoryResponse, PostResponse } from "@/graphql/gen/graphql";
import { detailTextStyle } from "@/style/PostStyle";
import { linkStyle } from "@/style/CommonStyle";

type Props = {
  post: PostResponse;
  categoryData?: PostCategoryResponse[];
  refetchData?: () => void;
};

export const MyPostRefComponent: FC<Props> = ({
  post,
  categoryData,
  refetchData,
}) => {
  const router = useRouter();
  const { prefectureMap } = useGeolocationService();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { updatePostInputSession } = usePostInputSessionStore();

  return (
    <div className="min-w-[300px] border border-gray-100 p-3">
      <div className={"text-wrap break-all text-black text-2xl"}>
        {post.title}
      </div>
      <div className={"flex gap-2"}>
        <div className={"min-w-[38px]"}>場所:</div>
        {!post.postPlace.url && <div>{post.postPlace.name}</div>}
        {post.postPlace.url && (
          <div>
            <Link
              href={post.postPlace.url}
              rel="noopener noreferrer"
              target="_blank"
              className={linkStyle()}
            >
              {post.postPlace.name}
            </Link>
          </div>
        )}
      </div>
      {post.postPlace.prefectureCode && (
        <div className={"flex gap-2 items-center"}>
          <div>
            都道府県/位置: {prefectureMap.get(post.postPlace.prefectureCode)}
          </div>
          {post.postPlace.latLon && (
            <MapModalByLatLonComponent latLon={post.postPlace.latLon} />
          )}
        </div>
      )}
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
      <div className={"flex gap-2"}>
        <div>公開設定:</div>
        <div>{post.isOpen ? "公開" : "非公開"}</div>
      </div>
      <div className={"flex gap-2"}>
        <div className={"min-w-[85px]"}>カテゴリー:</div>
        <div>
          {post.categoryIdList
            .flatMap((id) => {
              const name = categoryData?.find(
                (category) => category.id === id
              )?.name;
              return name ?? [];
            })
            .join("、")}
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
      <div className={"flex gap-3 mt-2 justify-center"}>
        <Button
          color="warning"
          onPress={() => {
            updatePostInputSession(undefined);
            router.push(`${POST_EDIT_PAGE_PATH}?id=${post.id}`);
          }}
        >
          編集
        </Button>
        <Button
          color="default"
          onPress={() => {
            setIsDeleteOpen(true);
          }}
        >
          削除
        </Button>
      </div>
      <PostDeleteDialogComponent
        isOpen={isDeleteOpen}
        closeDialog={() => {
          setIsDeleteOpen(false);
        }}
        post={post}
        refetchPostFunc={refetchData}
      />
    </div>
  );
};
