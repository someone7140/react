import { useSharedState } from "../../services/state/StateService";

import AnnouncementInputComponent from "../../components/announcement/AnnouncementInputComponent";

export default function AnnouncementCreate() {
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  return (
    <>
      {loginAuthSharedState?.isAdmin && (
        <AnnouncementInputComponent userToken={loginAuthSharedState.token} />
      )}
    </>
  );
}
