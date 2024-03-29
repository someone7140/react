import { useContext } from "react";
import useSWR from "swr";

import { AuthContext } from "./auth/AuthProvider";
import LoadingComponent from "./common/LoadingComponent";
import LoginComponent from "./auth/LoginComponent";
import HeaderComponent from "./common/HeaderComponent";
import GeographicPointsWeatherComponent from "./weather/GeographicPointsWeatherComponent";
import { getUserInfoFromLocalStorageToken } from "../grpc/api/AuthenticationUserApi";

export default function TopComponent() {
  const { authInfo, setAuthInfo } = useContext(AuthContext);
  const { data, error } = useSWR(
    "/grpc/getUserInfoFromLocalStorageToken",
    async () => {
      return await getUserInfoFromLocalStorageToken(authInfo, setAuthInfo);
    }
  );

  if (!data) return <LoadingComponent />;
  if (error) return <div>failed to load</div>;

  return (
    <>
      <HeaderComponent />
      {!authInfo && <LoginComponent />}
      {authInfo && <GeographicPointsWeatherComponent />}
    </>
  );
}
