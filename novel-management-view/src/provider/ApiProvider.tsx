"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";

import { useApiManagement } from "@/hooks/useApiManagement";
import { useAppSelector } from "@/store/reduxStore";

export default function ApiProvider({ children }: React.PropsWithChildren) {
  const authStorage = useAppSelector((state) => state.authStorage);
  const { makeApolloClient } = useApiManagement();

  return (
    <ApolloNextAppProvider
      makeClient={() => makeApolloClient(authStorage?.authToken)}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
