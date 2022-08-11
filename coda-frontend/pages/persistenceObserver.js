import { useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { setCookie } from "nookies";
import { authCookieDelete } from "../services/api/ApiAuthService";

export default function PersistenceObserver(prop) {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
      isModified: true,
    })) {
      if (modifiedAtom.key == "loginUser") {
        const atomLoadable = snapshot.getLoadable(modifiedAtom);
        if (atomLoadable.state === "hasValue") {
          const exp = atomLoadable?.contents?.loginUser?.exp;
          if (exp) {
            var nowDate = new Date();
            var nowTime = Math.floor(nowDate.getTime() / 1000);
            setCookie(prop.ctx, "user", JSON.stringify(atomLoadable.contents), {
              path: "/",
              maxAge: exp - nowTime,
            });
          } else {
            authCookieDelete(prop.ctx);
          }
        }
      }
      if (modifiedAtom.key == "authCheck") {
        const atomLoadable = snapshot.getLoadable(modifiedAtom);
        if (atomLoadable.state === "hasValue") {
          setCookie(
            prop.ctx,
            "authCheck",
            JSON.stringify(atomLoadable.contents),
            {
              path: "/",
            }
          );
        }
      }
    }
  });
  return <></>;
}
