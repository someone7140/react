import { useState } from "react";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import AnnouncementDeleteModalComponent from "./input/AnnouncementDeleteModalComponent";
import LoadingComponent from "../common/LoadingComponent";
import { useMutateApi } from "../../services/api/ApiHooksService";
import {
  deleteAnnouncement,
  getRecentAnnouncements,
} from "../../services/api/announcement/ApiAnnouncementService";
import { getDisplayDateMinuteUnit } from "../../services/date/DateService";

export default function AnnouncementManageComponent(prop) {
  const [deleteAnnouncementId, setDeleteAnnouncementId] = useState(undefined);
  const { mutate } = useSWRConfig();
  const { execPostApi, isLoading } = useMutateApi();

  const { data: registeredAnnouncements } = useSWR(
    "/announcement/getRecentAnnouncements",
    async () => {
      const result = await getRecentAnnouncements();
      if (result.status != 200) {
        toast.error("お知らせの取得に失敗しました", {
          duration: 3000,
        });
        return undefined;
      } else {
        return result.data;
      }
    }
  );

  function refetchAnnouncements() {
    mutate("/announcement/getRecentAnnouncements");
  }

  function deleteButtonClick(id) {
    setDeleteAnnouncementId(id);
  }

  async function handleDelete() {
    const deleteId = deleteAnnouncementId;
    setDeleteAnnouncementId(undefined);
    const result = await execPostApi({
      apiPath: "announcement/deleteAnnouncement",
      execPost: function () {
        return deleteAnnouncement(prop.userToken, deleteId);
      },
    });
    if (result?.status == 200) {
      toast.success("削除しました", {
        duration: 3000,
      });
      refetchAnnouncements();
    } else {
      toast.error("削除時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  const columnClassName =
    "border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-600 dark:text-slate-600 text-left";
  const recordClassName = "border-b dark:border-slate-600 h-14";

  return (
    <div className="w-screen flex justify-center items-center flex-col">
      <div className="max-w-lg flex flex-col">
        <div className="mb-6">
          <Link href="/announcement/announcement_create">
            <button
              className={
                "bg-blue-300 rounded px-4 py-2 border border-neutral-300"
              }
            >
              新規お知らせ追加
            </button>
          </Link>
        </div>
        {isLoading && (
          <div className="w-8 h-8 mt-2">
            <LoadingComponent />
          </div>
        )}
        {!isLoading &&
          registeredAnnouncements &&
          registeredAnnouncements.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th className={columnClassName}>タイトル</th>
                  <th className={columnClassName}>登録日</th>
                  <th className={columnClassName}>変更</th>
                </tr>
              </thead>
              <tbody>
                {registeredAnnouncements.map((announcement) => (
                  <tr className={recordClassName}>
                    <td>
                      <div className="break-all ml-1">{announcement.title}</div>
                    </td>
                    <td className="ml-1">
                      {getDisplayDateMinuteUnit(announcement.createdAt)}
                    </td>
                    <td>
                      <span className="ml-1">
                        <Link
                          href={`/announcement/announcement_edit?announcement_id=${announcement.id}`}
                        >
                          <button
                            className={
                              "bg-green-300 rounded px-4 py-1 border border-neutral-300 mt-2"
                            }
                          >
                            編集
                          </button>
                        </Link>
                        <br />
                        <button
                          className={
                            "bg-gray-300 rounded px-4 py-1 border border-neutral-300 mt-2 ml-1 mb-2"
                          }
                          onClick={() => {
                            deleteButtonClick(announcement.id);
                          }}
                        >
                          削除
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
      <AnnouncementDeleteModalComponent
        showModal={!!deleteAnnouncementId}
        handleDelete={handleDelete}
        handleCancel={() => {
          setDeleteAnnouncementId(undefined);
        }}
      />
    </div>
  );
}
