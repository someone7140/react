import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import AuthRegisteredEmailComponent from "../../components/auth/registerMethod/AuthRegisteredEmailComponent";

export default function EmailAuth() {
  const { query, isReady } = useRouter();
  const [registerId, setRegisterId] = useState(undefined);

  // パラメータから値を取得
  useEffect(() => {
    if (isReady) {
      const { register_id } = query;
      if (!register_id) {
        Router.push("/");
      }
      setRegisterId(register_id);
    }
  }, [isReady]);

  return (
    <>
      {registerId && <AuthRegisteredEmailComponent registerId={registerId} />}
    </>
  );
}
