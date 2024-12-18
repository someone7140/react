"use client";

import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";

import { MyPostRefComponent } from "@/components/post/ref/MyPostRefComponent";
import {
  useGetMyPostCategoriesQuery,
  useGetMyPostsQuery,
} from "@/graphql/gen/graphql";

export const PostListComponent: FC = ({}) => {
  const { data, loading, refetch } = useGetMyPostsQuery({
    variables: { idFilter: null, placeIdFilter: null, categoryIdsFilter: null },
    fetchPolicy: "network-only",
  });
  const { data: categoryData, loading: categoryLoading } =
    useGetMyPostCategoriesQuery({
      variables: { nameFilter: null },
      fetchPolicy: "network-only",
    });
  const [allPostLength, setAllPostLength] = useState<number | undefined>(
    undefined
  );

  const postList = data?.getMyPosts ?? [];

  useEffect(() => {
    if (data && allPostLength == null) {
      setAllPostLength(data.getMyPosts.length);
    }
  }, [data, allPostLength]);

  if (loading || categoryLoading) {
    return <Spinner />;
  }

  return (
    <>
      {allPostLength != null && (
        <>
          {allPostLength === 0 && <>投稿が未登録です</>}
          {allPostLength > 0 && (
            <div className="max-w-[90%] min-w-[320px]">
              {postList.length === 0 && <>指定した条件の場所はありません</>}
              {postList.length > 0 && (
                <div className="flex flex-col gap-5 max-w-[340px]">
                  {postList.map((post) => {
                    return (
                      <MyPostRefComponent
                        key={post.id}
                        post={post}
                        categoryData={categoryData?.getMyPostCategories}
                        refetchData={refetch}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
