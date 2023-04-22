import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

import NovelRegisterComponent from "components/novel/NovelRegisterComponent";
import { useAuthStore } from "hooks/store/useAuthStore";
import { getNovelList } from "services/api/ApiNovelService";

export default function NovelListComponent(prop) {
  const router = useRouter();
  const authStore = useAuthStore();
  const { data, isLoading, isError, refetch } = useQuery(
    ["novelList"],
    async () => {
      return await getNovelList(authStore.userAccount.token);
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop.listUpdateTime]);

  return (
    <>
      {isLoading && <ProgressSpinner />}
      {isError && (
        <div style={{ color: "red" }}>一覧取得時にエラーが発生しました</div>
      )}
      {!isLoading && !isError && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.length > 0 && (
            <table style={{ borderCollapse: "separate", borderSpacing: 20 }}>
              {data.map((novel) => (
                <tr key={novel.id}>
                  <td>{novel.title}</td>
                  <td>
                    <NovelRegisterComponent
                      setListUpdateTime={prop.setListUpdateTime}
                      novel={novel}
                    />
                  </td>
                  <td>
                    <Button
                      rounded
                      severity="success"
                      onClick={() => {
                        router.push(`/novel/setting/top?novelId=${novel.id}`);
                      }}
                    >
                      物語設定
                    </Button>
                  </td>
                </tr>
              ))}
            </table>
          )}
          {data.length === 0 && <>小説を登録してください</>}
        </div>
      )}
    </>
  );
}
