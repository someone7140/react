import Router from "next/router";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../atoms/LoginUser";

export const ProtectRouteAdmin = ({ children }) => {
  const [user, setUser] = useRecoilState(loginUserState);
  if (!user || !user.loginUser || user.loginUser?.user_type !== "admin") {
    if (typeof window !== "undefined") {
      Router.push("/");
    }
  }
  return children;
};
