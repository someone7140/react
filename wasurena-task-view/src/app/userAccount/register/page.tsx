"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";

import { userAccountAtom } from "@/atoms/jotaiAtoms";
import { UserAccountLineAuthComponent } from "@/components/userAccount/UserAccountLineAuthComponent";
import { UserAccountRegisterComponent } from "@/components/userAccount/UserAccountRegisterComponent";
import { TOP_PAGE_PATH } from "@/constants/MenuPathConstants";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
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
      <div className={pageTitleStyle()}>会員登録</div>
      {!authCode && redirectUrl && (
        <UserAccountLineAuthComponent redirectUrl={redirectUrl} />
      )}
      {authCode && <UserAccountRegisterComponent authCode={authCode} />}
    </div>
  );
}
