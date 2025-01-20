"use client";

import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { LinkIcon, UserIcon } from "@heroicons/react/24/solid";

import { PostListDisplayComponent } from "@/components/post/list/PostListDisplayComponent";
import { useGetOpenPostsWithAccountInfoQuery } from "@/graphql/gen/graphql";
import { detailTextStyle } from "@/style/PostStyle";
import { linkStyle } from "@/style/CommonStyle";

type Props = {
  userSettingId: string;
};

export const UserAccountProfileComponent: FC<Props> = ({ userSettingId }) => {
  const { data, loading } = useGetOpenPostsWithAccountInfoQuery({
    variables: {
      userSettingId: userSettingId,
    },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
    toast.error("ユーザ情報を取得できませんでした");
    return <></>;
  }

  const userInfo = data.getAccountUserByUserSettingId;
  const postList = data.getOpenPosts;

  return (
    <div className="max-w-[90%] min-w-[320px]">
      <div className="flex items-center gap-4">
        {userInfo.imageUrl ? (
          <Image
            src={userInfo.imageUrl}
            width={50}
            height={50}
            alt={"No Image"}
          />
        ) : (
          <UserIcon className="w-[50px] h-[50px]" />
        )}
        <div className="flex flex-col">
          <div className={`text-wrap break-all text-black text-2xl`}>
            {userInfo.name}
          </div>
          <div className={`text-wrap break-all text-black`}>
            @{userInfo.userSettingId}
          </div>
        </div>
      </div>
      <div className={`${detailTextStyle()} ml-1`}>{userInfo.detail}</div>
      {userInfo.urlList.length > 0 && (
        <div className="flex flex-col mt-2 ml-2 gap-2">
          {userInfo.urlList.map((url, i) => {
            return (
              <Link
                key={i}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                className={`truncate ${linkStyle()}`}
              >
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-[14px] h-[14px]" />
                  <div className={`text-wrap break-all text-sm w-[95%]`}>
                    {url}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <div className="mt-3 flex justify-center">
        <PostListDisplayComponent
          postList={postList}
          categoryList={[]}
          isOpenOnly
        />
      </div>
    </div>
  );
};
