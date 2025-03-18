"use client";

import { useSearchParams } from "next/navigation";

import { UserAccountLineAuthComponent } from "@/components/userAccount/UserAccountLineAuthComponent";
import { UserAccountRegisterComponent } from "@/components/userAccount/UserAccountRegisterComponent";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  // リダイレクトした時にパラメータが入る
  const authCode = searchParams.get("code") ?? undefined;
  const [redirectUrl, setRedirectUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    setRedirectUrl(window.location.href);
  }, []);

  return (
    <div>
      {!authCode && redirectUrl && (
        <UserAccountLineAuthComponent redirectUrl={redirectUrl} />
      )}
      {authCode && <UserAccountRegisterComponent authCode={authCode} />}
    </div>
  );
}
