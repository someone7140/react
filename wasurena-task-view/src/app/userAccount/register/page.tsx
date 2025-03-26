"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { UserAccountLineAuthComponent } from "@/components/userAccount/UserAccountLineAuthComponent";
import { UserAccountRegisterComponent } from "@/components/userAccount/UserAccountRegisterComponent";
import { pageTitleStyle } from "@/style/commonStyle";

export default function Home() {
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);
  const [authCode, setAuthCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    setAuthCode(searchParams.get("code") ?? undefined);
    setRedirectUrl(window.location.href);
  }, [searchParams]);

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
