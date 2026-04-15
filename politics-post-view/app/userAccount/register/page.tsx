"use client";

import { AuthGoogleComponent } from "@/components/auth/AuthGoogleComponent";

export default function Home() {
  const onAuthGoogle = async (authCode: string) => {
    console.log(authCode);
  };
  return (
    <AuthGoogleComponent onAuthGoogle={onAuthGoogle} disabledFlag={false} />
  );
}
