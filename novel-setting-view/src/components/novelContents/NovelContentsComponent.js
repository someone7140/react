import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import NovelContentsEditComponent from "components/novelContents/edit/NovelContentsEditComponent";
import { useAuthStore } from "hooks/store/useAuthStore";

export default function NovelContentsComponent(prop) {
  const router = useRouter();
  const authStore = useAuthStore();
  const { data, isLoading, isError, refetch } = useQuery(
    ["novelContents"],
    async () => {
      return true;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div style={{ textAlign: "center" }}>
      {isLoading && <ProgressSpinner />}
      {isError && (
        <div style={{ color: "red" }}>文章情報取得時にエラーが発生しました</div>
      )}
      {!isLoading && !isError && (
        <>
          <div
            style={{
              paddingBottom: 15,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ marginLeft: "5%" }}>
              <Button
                onClick={() => {
                  router.push("/novel/top");
                }}
                style={{
                  backgroundColor: "cornsilk",
                  borderColor: "cornsilk",
                  color: "gray",
                }}
              >
                ← 小説一覧へ戻る
              </Button>
            </div>
            <div style={{ fontSize: 20, marginRight: "25%" }}>
              「{data.novelTitle}」の文章
            </div>
            <div></div>
          </div>
          <NovelContentsEditComponent />
        </>
      )}
    </div>
  );
}
