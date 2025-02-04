"use client";

import { FC } from "react";
import Link from "next/link";

import {
  LOGIN_PAGE_PATH,
  UPDATE_INFO_PATH,
  USER_ACCOUNT_REGISTER_PAGE_PATH,
} from "@/constants/MenuPathConstants";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { linkStyle, pageTitleStyle } from "@/style/CommonStyle";
import { PostListDisplayComponent } from "@/components/post/list/PostListDisplayComponent";
import { useGetOpenPostsQuery } from "@/graphql/gen/graphql";
import { Spinner } from "@material-tailwind/react";

export const TopComponent: FC = ({}) => {
  const { userAccount } = useAuthManagement();
  const { data, loading } = useGetOpenPostsQuery({
    fetchPolicy: "network-only",
  });

  return (
    <div className="flex flex-col gap-2">
      {!userAccount && (
        <div className="pl-1 pr-3">
          Placeノートは、訪れた場所のメモや共有ができるサービスです。
          <br />
          まずは、
          <Link href={LOGIN_PAGE_PATH} className={linkStyle()}>
            ログイン
          </Link>
          または
          <Link href={USER_ACCOUNT_REGISTER_PAGE_PATH} className={linkStyle()}>
            会員登録
          </Link>
          を行なって投稿してみましょう。
        </div>
      )}
      <Link href={UPDATE_INFO_PATH} className={linkStyle()}>
        機能等の更新履歴
      </Link>
      <div className={pageTitleStyle()}>最近公開された投稿</div>
      <div className="flex justify-center">
        {loading && <Spinner />}
        {data && (
          <PostListDisplayComponent
            postList={data.getOpenPosts}
            categoryList={[]}
            isOpenOnly
            isDisplayUserInfo
          />
        )}
      </div>
    </div>
  );
};
