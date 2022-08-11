import { useRecoilState } from "recoil";
import { loginUserState } from "../../atoms/LoginUser";
import { authCheckState } from "../../atoms/AuthCheck";
import { authCheckApi } from "../../services/api/ApiAuthService";

export default function AuthCheckComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [authCheck, setAuthCheck] = useRecoilState(authCheckState);

  if (!authCheck.checked) {
    if (user && user.loginUser) {
      authCheckApi(user, setUser, prop.ctx, setAuthCheck);
    } else {
      setAuthCheck({ checked: true });
    }
  }

  return <></>;
}
