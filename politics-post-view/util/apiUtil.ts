import { ApolloLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
// @ts-ignore
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { GraphQLFormattedError } from "graphql";

import { ErrorType } from "@/graphql/gen/graphql";
import { useAuthStore } from "@/hooks/globalStore/useAuthStore";

declare module "@apollo/client" {
  namespace ApolloClient {
    namespace DeclareDefaultOptions {
      interface WatchQuery {
        errorPolicy: "all";
      }
      interface Query {
        errorPolicy: "all";
      }
      interface Mutate {
        errorPolicy: "all";
      }
    }
  }
}

export const makeApiClient = () => {
  const httpLink = new UploadHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}`,
    useGETForQueries: false,
  });
  const authLink = new ApolloLink((operation, forward) => {
    const token = useAuthStore.getState().authToken;
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
              "Apollo-Require-Preflight": "true",
            }
          : {}),
      },
    }));
    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
    defaultOptions: {
      watchQuery: { errorPolicy: "all" },
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });
};

export const getErrorCodeFromGraphQLError = (
  errors: ReadonlyArray<GraphQLFormattedError>,
) => {
  // エラーの配列の一つ目にエラーコードが入る前提
  const errorCode = errors?.[0]?.extensions?.code as ErrorType;

  return errorCode;
};
