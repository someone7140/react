"use client";

import { useAuthManagement } from "@/hooks/useAuthManagement";
import { PostListComponent } from "@/components/post/PostListComponent";

export default function Home() {
  const { userAccount } = useAuthManagement();

  return <>{userAccount && <PostListComponent />}</>;
}
