import Router from "next/router";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../atoms/LoginUser";

export const ProtectRoute = ({ children }) => {
  const [user, setUser] = useRecoilState(loginUserState);
  if (!user || !user.loginUser) {
    if (typeof window !== "undefined") {
      Router.push("/");
    }
  }
  return children;
};
