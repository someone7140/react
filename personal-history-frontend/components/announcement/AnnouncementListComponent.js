import Link from "next/link";
import useSWR from "swr";
import toast from "react-hot-toast";

import { getRecentAnnouncements } from "../../services/api/announcement/ApiAnnouncementService";
import {
  getDiffHourFromNow,
  getDisplayDateMinuteUnit,
} from "../../services/date/DateService";

export default function AnnouncementListComponent() {
  const { data: announcements } = useSWR(
    "/announcement/getRecentAnnouncements",
    async () => {
      const result = await getRecentAnnouncements();
      if (result.status != 200) {
        toast.error("お知らせの取得に失敗しました", {
          duration: 3000,
        });
        return [];
      } else {
        return result.data;
      }
    }
  );

  function isNew(createdAt) {
    const diff = getDiffHourFromNow(createdAt);
    console.log(diff);
    return diff > -48;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-bold">【お知らせ】</div>
      {announcements && (
        <>
          {announcements.length > 0 && (
            <div className="flex  flex-col container mt-2 bg-white border-2 border-black-800 rounded-lg shadow overflow-y-auto h-36">
              <ul className="flex flex-col divide-y">
                {announcements.map((announcement) => (
                  <li className="flex flex-row justify-between mt-2 mb-2 w-[370px]">
                    <div className="ml-1 max-w-[220px]">
                      <div className="break-all">
                        {announcement.title}
                        {isNew(announcement.createdAt) && (
                          <span className="box h-4 w-4 bg-yellow-200 ml-2">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="mr-2">
                        {getDisplayDateMinuteUnit(announcement.createdAt)}
                      </div>
                      <div className="mt-2 text-right mr-1">
                        <Link
                          href={`/announcement/announcement_detail?announcement_id=${announcement.id}`}
                        >
                          <button
                            className={
                              "bg-green-300 rounded px-4 py-1 border border-neutral-300"
                            }
                          >
                            詳細へ
                          </button>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {announcements.length == 0 && (
            <div className="mt-2">お知らせはありません</div>
          )}
        </>
      )}
    </div>
  );
}
