import { useSharedState } from "../../services/state/StateService";

import HistoryCategoryListComponent from "../../components/historyCategory/HistoryCategoryListComponent";

export default function CategoryList() {
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  return (
    <>
      {loginAuthSharedState && (
        <HistoryCategoryListComponent userToken={loginAuthSharedState.token} />
      )}
    </>
  );
}
