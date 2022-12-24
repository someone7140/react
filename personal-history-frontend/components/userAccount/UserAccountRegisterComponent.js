import { useEffect, useState } from "react";

import UserAccountInputComponent from "./UserAccountInputComponent";
import { useSharedState } from "../../services/state/StateService";

export default function UserAccountRegisterComponent() {
  const {
    sharedState: registerAuthSharedState,
    setSharedState: setRegisterAuthSharedState,
  } = useSharedState("registerAuthSharedState", undefined);
  const [initialData, setInitialData] = useState(undefined);

  useEffect(() => {
    if (registerAuthSharedState?.googleToken) {
      setInitialData({
        googleToken: registerAuthSharedState.googleToken,
      });
    } else if (registerAuthSharedState?.emailToken) {
      setInitialData({
        emailToken: registerAuthSharedState.emailToken,
      });
    } else if (registerAuthSharedState?.twitterToken) {
      setInitialData({
        twitterToken: registerAuthSharedState.twitterToken,
        twitterUserName: registerAuthSharedState.userName,
      });
    }
    setRegisterAuthSharedState(undefined);
  }, [registerAuthSharedState]);

  return (
    <>
      {initialData && <UserAccountInputComponent initialData={initialData} />}
    </>
  );
}
