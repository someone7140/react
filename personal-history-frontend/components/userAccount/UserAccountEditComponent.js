import { useSharedState } from "../../services/state/StateService";

import UserAccountInputComponent from "./UserAccountInputComponent";

export default function UserAccountEditComponent() {
  const { sharedState: loginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );
  return (
    <>
      {loginAuthSharedState && (
        <UserAccountInputComponent initialData={loginAuthSharedState} />
      )}
    </>
  );
}
