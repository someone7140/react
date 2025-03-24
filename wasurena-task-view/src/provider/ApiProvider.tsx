"use client";

import { useEffect, useState } from "react";
import { Client, Provider } from "urql";

import { useApiManagement } from "@/hooks/useApiManagement";

// クライアントコンポーネント用のプロバイダー
export const ApiProvider = ({
  children,
  serverToken,
  initialState,
}: {
  children: React.ReactNode;
  serverToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialState?: any;
}) => {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const { ssrCache, createUrqlClient } = useApiManagement();

  useEffect(() => {
    // SSRデータがあれば復元
    if (initialState) {
      ssrCache.restoreData(initialState);
    }
    // クライアントを設定
    setClient(createUrqlClient());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState, serverToken]);

  // クライアントが初期化されるまでの間、または初期SSRレンダリングのためのクライアント
  const urqlClient = client || createUrqlClient(serverToken);

  return <Provider value={urqlClient}>{children}</Provider>;
};
