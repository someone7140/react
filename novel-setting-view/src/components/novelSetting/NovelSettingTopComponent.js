import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { ProgressSpinner } from "primereact/progressspinner";

import NovelListComponent from "components/novel/NovelListComponent";
import NovelSettingRecordRegisterComponent from "components/novelSetting/NovelSettingRecordRegisterComponent";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getNovelSettingList } from "services/api/ApiNovelSettingService";

export default function NovelSettingTopComponent() {
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
          <div style={{ paddingBottom: 15, fontSize: 20 }}>
            「{data.novelTitle}」の設定
          </div>
          <NovelListComponent
            setListUpdateTime={setListUpdateTime}
            novelId={prop.novelId}
            data={data.settingList}
          />
          <NovelSettingRecordRegisterComponent
            setListUpdateTime={prop.setListUpdateTime}
            novelId={prop.novelId}
            settingList={data.settingList}
          />
        </>
      )}
    </div>
  );
}
