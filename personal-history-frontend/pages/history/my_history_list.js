import { useSharedState } from "../../services/state/StateService";

import MyHistoryListComponent from "../../components/history/MyHistoryListComponent";

export default function MyHistoryList() {
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  return (
    <>
      {loginAuthSharedState && (
        <MyHistoryListComponent userToken={loginAuthSharedState.token} />
      )}
    </>
  );
}
