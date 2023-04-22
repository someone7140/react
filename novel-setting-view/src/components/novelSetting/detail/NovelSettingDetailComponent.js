import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import { useAuthStore } from "hooks/store/useAuthStore";
import { getNovelSettingById } from "services/api/ApiNovelSettingService";

export default function NovelSettingDetailComponent(prop) {
  const router = useRouter();
  const authStore = useAuthStore();
  const { data, isLoading, isError } = useQuery(
    ["novelSetting"],
    async () => {
      return await getNovelSettingById(
        authStore.userAccount.token,
        prop.id,
        prop.novelId
      );
    },
    {
      enabled: true,
    }
  );

  console.log(data);
  return (
    <div style={{ textAlign: "center" }}>
      {isLoading && <ProgressSpinner />}
      {isError && (
        <div style={{ color: "red" }}>設定情報取得時にエラーが発生しました</div>
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
                  router.push(`/novel/setting/top?novelId=${prop.novelId}`);
                }}
                style={{
                  backgroundColor: "gainsboro",
                  borderColor: "gainsboro",
                  color: "gray",
                }}
              >
                ← 設定一覧へ戻る
              </Button>
            </div>
            <div style={{ fontSize: 20, marginRight: "20%" }}>
              「{data.novelTitle}ー{data.setting.name}」の設定
            </div>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
}
