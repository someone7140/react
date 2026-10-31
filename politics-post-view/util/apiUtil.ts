import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
// @ts-ignore
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { GraphQLFormattedError } from "graphql";

import { ErrorType } from "@/graphql/gen/graphql";

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

export const makeApiClient = (authToken?: string) => {
  let headers: Record<string, string> = {};
  if (authToken) {
    headers = {
      Authorization: `Bearer ${authToken}`,
      "Apollo-Require-Preflight": "true",
    };
  }

  const apolloLink = new UploadHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers,
    useGETForQueries: false,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: apolloLink,
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
