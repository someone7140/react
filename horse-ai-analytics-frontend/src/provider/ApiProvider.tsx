"use client";

import { ApolloLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

import { getApolloLink } from "@/constants/ApolloLinkConstants";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

function makeClient(authToken?: string) {
  let header: Record<string, string> = {};
  if (authToken) {
    header = {
      Authorization: `Bearer ${authToken}`,
    };
  }

  const apolloLink = getApolloLink(header);
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            apolloLink,
          ])
        : apolloLink,
  });
}

export function ApiProvider({ children }: React.PropsWithChildren) {
  const { authToken } = useAuthTokenLocalStorage();

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(authToken)}>
      {children}
    </ApolloNextAppProvider>
  );
}
