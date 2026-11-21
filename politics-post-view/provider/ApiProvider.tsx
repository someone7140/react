"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeApiClient } from "@/util/apiUtil";

export function ApiProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={() => makeApiClient()}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
