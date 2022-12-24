import Router from "next/router";
import useSWR from "swr";
import toast from "react-hot-toast";

import AnnouncementInputComponent from "./AnnouncementInputComponent";
import LoadingComponent from "../common/LoadingComponent";
import { getAnnouncementById } from "../../services/api/announcement/ApiAnnouncementService";

export default function AnnouncementEditComponent(prop) {
  const { data: announcement } = useSWR(
    `/announcement/getAnnouncementById/${prop.announcementId}`,
    async () => {
      const result = await getAnnouncementById(prop.announcementId);
      if (result.status != 200) {
        toast.error("お知らせの取得に失敗しました", {
          duration: 3000,
        });
        Router.push("/announcement/announcement_manage");
        return undefined;
      } else {
        return result.data;
      }
    }
  );

  return (
    <>
      {announcement && (
        <AnnouncementInputComponent
          userToken={prop.userToken}
          initialData={announcement}
        />
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
