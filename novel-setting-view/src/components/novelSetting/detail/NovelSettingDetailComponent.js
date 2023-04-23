import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { v4 as uuidv4 } from "uuid";

import NovelSettingDetailRootInputComponent from "components/novelSetting/detail/input/NovelSettingDetailRootInputComponent";
import NovelSettingDetailRegisterComponent from "components/novelSetting/detail/NovelSettingDetailRegisterComponent";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getNovelSettingById } from "services/api/ApiNovelSettingService";

export default function NovelSettingDetailComponent(prop) {
  const router = useRouter();
  const authStore = useAuthStore();
  const [settings, setSettings] = useState([]);
  const { data, isLoading, isError, refetch } = useQuery(
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

  useEffect(() => {
    if (data?.settings) {
      const settingsFromApi = JSON.parse(data.settings);
      if (settingsFromApi?.length > 0) {
        setSettings(settingsFromApi);
      }
    } else {
      setSettings([]);
    }
  }, [data]);

  return (
    <div style={{ textAlign: "center" }}>
      {isLoading && <ProgressSpinner />}
      {isError && (
        <div style={{ color: "red" }}>設定情報取得時にエラーが発生しました</div>
      )}
      {!isLoading && !isError && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <div
            style={{
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
          <div>
            {settings.length == 0 && <>まずは設定行を追加してください</>}
            {settings.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {settings.map((setting) => (
                  <NovelSettingDetailRootInputComponent
                    key={setting.id}
                    setSettings={setSettings}
                    setting={setting}
                    settings={settings}
                  />
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
            }}
          >
            <Button
              severity="success"
              onClick={() => {
                setSettings([...settings, { id: uuidv4() }]);
              }}
            >
              設定行を追加
            </Button>
            <NovelSettingDetailRegisterComponent
              id={prop.id}
              novelId={prop.novelId}
              settings={settings}
            />
            <Button
              severity="secondary"
              onClick={() => {
                refetch();
              }}
            >
              保存前に戻す
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
