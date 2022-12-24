import { useSharedState } from "../../services/state/StateService";

import AnnouncementManageComponent from "../../components/announcement/AnnouncementManageComponent";

export default function AnnouncementManage() {
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  return (
    <>
      {loginAuthSharedState?.isAdmin && (
        <AnnouncementManageComponent userToken={loginAuthSharedState.token} />
      )}
    </>
  );
}
