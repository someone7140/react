import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import NovelPromptTextAreaComponent from "components/novelPrompt/input/NovelPromptTextAreaComponent";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getNovelSettingList } from "services/api/ApiNovelSettingService";

export default function NovelPromptComponent(prop) {
  const router = useRouter();
  const authStore = useAuthStore();
  const [promptInput, setPromptInput] = useState(undefined);
  const [inputSettingList, setInputSettingList] = useState(undefined);

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
                  <i class="pi pi-external-link" />
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
            <div>クリップボードにコピー</div>
            <NovelPromptTextAreaComponent
              value={promptInput}
              setValue={setPromptInput}
            />
          </div>
        </div>
      )}
    </div>
  );
}
