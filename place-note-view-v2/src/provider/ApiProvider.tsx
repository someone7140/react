"use client";

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { useAuthManagement } from "@/hooks/useAuthManagement";

function makeClient(authToken?: string) {
  let headers: Record<string, string> = {};
  if (authToken) {
    headers = {
      Authorization: `Bearer ${authToken}`,
      "Apollo-Require-Preflight": "true",
    };
  }

  const apolloLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers,
    useGETForQueries: false,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: apolloLink,
    defaultOptions: {
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });
}

export function ApiProvider({ children }: React.PropsWithChildren) {
  const { authTokenLocalStorage } = useAuthManagement();

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(authTokenLocalStorage)}>
      {children}
    </ApolloNextAppProvider>
  );
}
