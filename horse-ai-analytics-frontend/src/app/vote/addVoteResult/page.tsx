"use client";

import { RegisterVoteResultComponent } from "@/components/feature/vote/RegisterVoteResultComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return <div>{authStore.userAccount && <RegisterVoteResultComponent />}</div>;
}
