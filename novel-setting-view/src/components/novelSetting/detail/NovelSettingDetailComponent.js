import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { v4 as uuidv4 } from "uuid";

import NovelSettingDetailRootInputComponent from "components/novelSetting/detail/input/NovelSettingDetailRootInputComponent";
import { useAuthStore } from "hooks/store/useAuthStore";
import {
  getNovelSettingById,
  updateNovelSettings,
} from "services/api/ApiNovelSettingService";

export default function NovelSettingDetailComponent(prop) {
  const toast = useRef(null);
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

  const { mutate, isLoading: isMutationLoading } = useMutation(
    async () => {
      await updateNovelSettings(authStore.userAccount.token, prop.id, settings);
    },
    {
      onSuccess: (response) => {
        toast.current.show({
          severity: "info",
          summary: "Info",
          detail: "保存しました",
          life: 3000,
        });
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "保存時にエラーが発生しました",
          life: 3000,
        });
      },
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
      <Toast ref={toast} />
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
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
              disabled={isMutationLoading || isLoading}
            >
              設定行を追加
            </Button>
            <Button
              onClick={() => {
                mutate();
              }}
              disabled={isLoading}
              loading={isMutationLoading}
            >
              保存
            </Button>
            <Button
              severity="secondary"
              onClick={async () => {
                await refetch();
                toast.current.show({
                  severity: "info",
                  summary: "Info",
                  detail: "戻しました",
                  life: 3000,
                });
              }}
              disabled={isMutationLoading || isLoading}
            >
              保存前に戻す
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
