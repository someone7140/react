import { useState } from "react";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import HistoryRegisterComponent from "./HistoryRegisterComponent";
import HistoryRecordsComponent from "./reference/HistoryRecordsComponent";
import LoadingComponent from "../common/LoadingComponent";
import { useMutateApi } from "../../services/api/ApiHooksService";
import {
  getMyHistory,
  registerHistory,
} from "../../services/api/history/ApiHistoryService";

export default function MyHistoryListComponent(prop) {
  const { execPostApi, isLoading } = useMutateApi();
  const { mutate } = useSWRConfig();

  const [registerHistoryInfo, setRegisterHistoryInfo] = useState(undefined);
  const { data: myHistories } = useSWR("/history/getOwnHistories", async () => {
    const result = await getMyHistory(prop.userToken);
    if (result.status != 200) {
      toast.error("経歴の取得に失敗しました", {
        duration: 3000,
      });
      return undefined;
    } else {
      return result.data;
    }
  });

  function onClickRegisterHistory(history) {
    setRegisterHistoryInfo(history);
  }

  async function handleRegister(id, categoryId, histories) {
    setRegisterHistoryInfo(undefined);
    const result = await execPostApi({
      apiPath: "history/registerHistory",
      execPost: function () {
        return registerHistory(prop.userToken, id, categoryId, histories);
      },
    });
    if (result?.status == 200) {
      mutate("/history/getOwnHistories");
      toast.success("経歴登録しました", {
        duration: 3000,
      });
    } else {
      toast.error("登録時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  return (
    <div className="w-screen flex justify-center items-center flex-col">
      {myHistories && !registerHistoryInfo && !isLoading && (
        <>
          {myHistories.map((history) => (
            <div className="mb-8">
              <div className="mb-2 flex flex-row items-center">
                <div className="font-bold break-all w-28">
                  {history.categoryName}
                </div>
                <div className="ml-2">
                  {history.openFlag ? "公開" : "非公開"}
                </div>
                <div className="ml-2">
                  <Link
                    className="mt-2"
                    href={`/history_category/category_list`}
                  >
                    <button
                      className={
                        "bg-green-300 rounded w-20 border border-neutral-300 "
                      }
                    >
                      公開設定
                    </button>
                  </Link>
                </div>
              </div>
              {history?.historyRecords && history.historyRecords.length > 0 && (
                <div className="mt-2">
                  <HistoryRecordsComponent histories={history.historyRecords} />
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  className={
                    "bg-blue-300 rounded px-4 py-2 border border-neutral-300"
                  }
                  onClick={() => {
                    onClickRegisterHistory(history);
                  }}
                >
                  経歴登録
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {registerHistoryInfo && (
        <HistoryRegisterComponent
          history={registerHistoryInfo}
          handleCancel={() => {
            setRegisterHistoryInfo(undefined);
          }}
          handleRegister={handleRegister}
        />
      )}

      {isLoading && (
        <div className="w-8 h-8 mt-2">
          <LoadingComponent />
        </div>
      )}
    </div>
  );
}
