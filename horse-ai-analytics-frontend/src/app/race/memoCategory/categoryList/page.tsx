"use client";

import { RaceMemoCategoryListComponent } from "@/components/feature/raceMemoCategory/RaceMemoCategoryListComponent";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div>{authStore.userAccount && <RaceMemoCategoryListComponent />}</div>
  );
}
