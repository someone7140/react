import { useRef, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";

import NovelPromptSettingSelectComponent from "components/novelPrompt/input/NovelPromptSettingSelectComponent";
import NovelPromptTextAreaComponent from "components/novelPrompt/input/NovelPromptTextAreaComponent";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getNovelSettingList } from "services/api/ApiNovelSettingService";

export default function NovelPromptComponent(prop) {
  const router = useRouter();
  const toast = useRef(null);
  const authStore = useAuthStore();
  const [promptInput, setPromptInput] = useState(undefined);
  const [inputSetting, setInputSetting] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["novelSettingList"],
    async () => {
      return await getNovelSettingList(
        authStore.userAccount.token,
        prop.novelId
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div style={{ textAlign: "center" }}>
      <Toast ref={toast} />
      {isLoading && <ProgressSpinner />}
      {isError && (
        <div style={{ color: "red" }}>設定取得時にエラーが発生しました</div>
      )}
      {!isLoading && !isError && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              paddingBottom: 15,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 1200,
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
            <div style={{ fontSize: 20 }}>
              「{data.novelTitle}」の設定でプロンプト作成
            </div>
            <div>
              <Link
                href={`/novel/contents?novelId=${prop.novelId}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginRight: 40,
                  }}
                >
                  <i className="pi pi-external-link" />
                  <div>小説内容</div>
                </div>
              </Link>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Button
              severity="success"
              onClick={() => {
                navigator.clipboard.writeText(promptInput);
                toast.current.show({
                  severity: "info",
                  summary: "Info",
                  detail: "クリップボードに内容をコピーしました",
                  life: 3000,
                });
              }}
              style={{ marginBottom: 15 }}
            >
              クリップボードにコピー
            </Button>
            <NovelPromptTextAreaComponent
              value={promptInput}
              setValue={setPromptInput}
              inputSetting={inputSetting}
              setInputSetting={setInputSetting}
            />
            <NovelPromptSettingSelectComponent
              novelId={prop.novelId}
              settingList={data.settingList}
              promptValue={promptInput}
              setPromptValue={setPromptInput}
            />
          </div>
        </div>
      )}
    </div>
  );
}
