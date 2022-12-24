import useSWR from "swr";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";
import HeaderComponent from "../components/common/HeaderComponent";
import LoadingComponent from "../components/common/LoadingComponent";
import { getMyUserInfo } from "../services/api/userAccount/ApiUserAccountService";
import {
  deleteAuthTokenLocalStorage,
  getAuthTokenFromLocalStorage,
  setAuthTokenToLocalStorage,
} from "../services/localStorage/AccountAuthService";
import { useSharedState } from "../services/state/StateService";

function MyApp({ Component, pageProps }) {
  const {
    sharedState: loginAuthSharedState,
    setSharedState: setLoginAuthSharedState,
  } = useSharedState("loginAuthSharedState", undefined);

  const { data } = useSWR("/userAccount/updateAuthInfo", async () => {
    return await updateAuthInfo();
  });

  async function updateAuthInfo() {
    const authToken = getAuthTokenFromLocalStorage();
    if (authToken && !loginAuthSharedState) {
      const result = await getMyUserInfo(authToken);
      if (result.status != 200) {
        deleteAuthTokenLocalStorage();
      } else {
        setLoginAuthSharedState(result.data);
        // トークンを新しいものでセット
        setAuthTokenToLocalStorage(result.data.token);
      }
    }
    return true;
  }

  return (
    <>
      {data && (
        <>
          <HeaderComponent />
          <Component {...pageProps} />
          <Toaster />
        </>
      )}
      {!data && (
        <div className="w-screen flex justify-center items-center">
          <div className="w-8 h-8 mt-4">
            <LoadingComponent />
          </div>
        </div>
      )}
    </>
  );
}

export default MyApp;
