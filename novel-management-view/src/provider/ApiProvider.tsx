"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";

import { useApiManagement } from "@/hooks/useApiManagement";
import { useAppSelector } from "@/store/reduxStore";

export default function ApiProvider({ children }: React.PropsWithChildren) {
  const userAccountState = useAppSelector((state) => state.userAccount);
  const { makeApolloClient } = useApiManagement();

  return (
    <ApolloNextAppProvider
      makeClient={() => makeApolloClient(userAccountState?.token)}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
