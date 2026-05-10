"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { useAuthManagement } from "@/hooks/useAuthManagement";
import { makeApiClient } from "@/util/apiUtil";

export function ApiProvider({ children }: React.PropsWithChildren) {
  const { authTokenLocalStorage } = useAuthManagement();

  return (
    <ApolloNextAppProvider
      makeClient={() => makeApiClient(authTokenLocalStorage)}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
