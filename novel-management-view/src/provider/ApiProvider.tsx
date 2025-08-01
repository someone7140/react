"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";

import { useApiManagement } from "@/hooks/useApiManagement";

export function ApiProvider({ children }: React.PropsWithChildren) {
  const { makeApolloClient } = useApiManagement();

  return (
    <ApolloNextAppProvider makeClient={() => makeApolloClient()}>
      {children}
    </ApolloNextAppProvider>
  );
}
