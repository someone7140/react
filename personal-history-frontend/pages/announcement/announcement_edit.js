import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import { useSharedState } from "../../services/state/StateService";

import AnnouncementEditComponent from "../../components/announcement/AnnouncementEditComponent";

export default function AnnouncementEdit() {
  const { query, isReady } = useRouter();
  const [announcementId, setAnnouncementId] = useState(undefined);

  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  // パラメータから値を取得
  useEffect(() => {
    if (isReady) {
      const { announcement_id } = query;
      if (!announcement_id) {
        Router.push("/announcement/announcement_manage");
      }
      setAnnouncementId(announcement_id);
    }
  }, [isReady]);

  return (
    <>
      {loginAuthSharedState?.isAdmin && announcementId && (
        <AnnouncementEditComponent
          userToken={loginAuthSharedState.token}
          announcementId={announcementId}
        />
      )}
    </>
  );
}
