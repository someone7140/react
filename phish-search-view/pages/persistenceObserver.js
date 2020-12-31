import { useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { setCookie } from "nookies";

export function PersistenceObserver(prop) {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
      isModified: true,
    })) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      if (atomLoadable.state === "hasValue") {
        setCookie(prop.ctx, "user", JSON.stringify(atomLoadable.contents), {
          path: "/",
        });
      }
    }
  });
  return <></>;
}
