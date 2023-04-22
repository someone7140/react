import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import NovelSettingRecordRegisterComponent from "components/novelSetting/NovelSettingRecordRegisterComponent";
import NovelSettingListComponent from "components/novelSetting/NovelSettingListComponent";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getNovelSettingList } from "services/api/ApiNovelSettingService";

export default function NovelSettingTopComponent(prop) {
  const router = useRouter();
  const [listUpdateTime, setListUpdateTime] = useState(Date.now());
  const authStore = useAuthStore();
  const { data, isLoading, isError, refetch } = useQuery(
    ["novelSettingList"],
    async () => {
      return await getNovelSettingList(
        authStore.userAccount.token,
        prop.novelId
      );
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listUpdateTime]);

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
            <div style={{ marginLeft: 150 }}>
              <Button
                onClick={() => {
                  router.push("/novel/top");
                }}
                style={{
                  backgroundColor: "gainsboro",
                  borderColor: "gainsboro",
                  color: "gray",
                }}
              >
                ← 小説一覧へ戻る
              </Button>
            </div>
            <div style={{ fontSize: 20, marginRight: 450 }}>
              「{data.novelTitle}」の設定
            </div>
            <div></div>
          </div>
          <div style={{ marginRight: 150 }}>
            <NovelSettingListComponent
              setListUpdateTime={setListUpdateTime}
              novelId={prop.novelId}
              data={data.settingList}
            />
            <NovelSettingRecordRegisterComponent
              setListUpdateTime={setListUpdateTime}
              novelId={prop.novelId}
              settingList={data.settingList}
            />
          </div>
        </>
      )}
    </div>
  );
}
