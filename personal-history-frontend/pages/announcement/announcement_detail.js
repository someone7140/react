import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import AnnouncementDetailComponent from "../../components/announcement/AnnouncementDetailComponent";

export default function AnnouncementEdit() {
  const { query, isReady } = useRouter();
  const [announcementId, setAnnouncementId] = useState(undefined);

  // パラメータから値を取得
  useEffect(() => {
    if (isReady) {
      const { announcement_id } = query;
      if (!announcement_id) {
        Router.push("/");
      }
      setAnnouncementId(announcement_id);
    }
  }, [isReady]);

  return (
    <>
      {announcementId && (
        <AnnouncementDetailComponent announcementId={announcementId} />
      )}
    </>
  );
}
