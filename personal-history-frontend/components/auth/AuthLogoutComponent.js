import { useEffect, useRef } from "react";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

import LoadingComponent from "../common/LoadingComponent";
import { deleteAuthTokenLocalStorage } from "../../services/localStorage/AccountAuthService";
import { useSharedState } from "../../services/state/StateService";

export default function AuthLogoutComponent() {
  const executeFlag = useRef(false);
  const { isReady } = useRouter();
  const { setSharedState: setLoginAuthSharedState } = useSharedState(
    "loginAuthSharedState",
    undefined
  );

  useEffect(() => {
    if (isReady && localStorage && !executeFlag.current) {
      executeFlag.current = true;
      setLoginAuthSharedState(undefined);
      deleteAuthTokenLocalStorage();
      toast.success("ログアウトしました", {
        duration: 3000,
      });
      Router.push("/");
    }
  }, [isReady, localStorage]);

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="w-8 h-8">
        <LoadingComponent />
      </div>
    </div>
  );
}
