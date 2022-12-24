import Link from "next/link";
import Router from "next/router";
import useSWR from "swr";
import toast from "react-hot-toast";

import LoadingComponent from "../common/LoadingComponent";
import { getAnnouncementById } from "../../services/api/announcement/ApiAnnouncementService";

export default function AnnouncementDetailComponent(prop) {
  const { data: announcement } = useSWR(
    `/announcement/getAnnouncementById/${prop.announcementId}`,
    async () => {
      const result = await getAnnouncementById(prop.announcementId);
      if (result.status != 200) {
        toast.error("お知らせの取得に失敗しました", {
          duration: 3000,
        });
        Router.push("/");
        return undefined;
      } else {
        return result.data;
      }
    }
  );

  return (
    <>
      {announcement && (
        <div className="w-screen flex justify-center items-center flex-col">
          <div className="flex flex-col max-w-[95%]">
            <div className="font-bold">{`【お知らせ】${announcement.title}`}</div>
            <div className="flex min-w-[300px] flex-col container mt-2 bg-white border-2 border-black-800 rounded-lg shadow overflow-y-auto h-36">
              <div
                className="mt-2 mb-2 ml-1"
                dangerouslySetInnerHTML={{
                  __html: announcement.announcementHtml,
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/">
              <span className="text-sky-500 underline" role="button">
                TOPへ戻る
              </span>
            </Link>
          </div>
        </div>
      )}
      {!announcement && (
        <div className="w-screen flex justify-center items-center">
          <div className="w-8 h-8 mt-2">
            <LoadingComponent />
          </div>
        </div>
      )}
    </>
  );
}
