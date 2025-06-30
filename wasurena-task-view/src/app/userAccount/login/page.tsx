"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { Loader } from "@mantine/core";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { UserAccountLineAuthComponent } from "@/components/userAccount/UserAccountLineAuthComponent";
import { UserAccountLoginComponent } from "@/components/userAccount/UserAccountLoginComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  return (
    <Suspense fallback={<Loader size={30} />}>
      <PageComponent />
    </Suspense>
  );
}

function PageComponent() {
  const searchParams = useSearchParams();
  const [userAccountState] = useAtom(userAccountAtom);
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);
  const [authCode, setAuthCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (userAccountState) {
      window.location.href = TOP_PAGE_PATH;
    }
    setAuthCode(searchParams.get("code") ?? undefined);
    setRedirectUrl(window.location.href);
  }, [searchParams, userAccountState]);

  return (
    <div>
      <div className={pageTitleStyle()}>ログイン</div>
      {!authCode && redirectUrl && (
        <UserAccountLineAuthComponent redirectUrl={redirectUrl} />
      )}
      {authCode && <UserAccountLoginComponent authCode={authCode} />}
    </div>
  );
}
