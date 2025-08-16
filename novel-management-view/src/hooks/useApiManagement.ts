import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { GraphQLFormattedError } from "graphql";

export const useApiManagement = () => {
  const makeApolloClient = (authToken?: string) => {
    let headers: Record<string, string> = {};
    if (authToken) {
      headers = {
        Authorization: `Bearer ${authToken}`,
        "Apollo-Require-Preflight": "true",
      };
    }

    const apolloLink = new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_URL}`,
      headers,
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
  };

  // graphqlエラーからコードを取得
  const getErrorCodeFromGraphQLError = (
    errors: ReadonlyArray<GraphQLFormattedError>
  ) => {
    // エラーの配列の一つ目にエラーコードが入る前提
    const errorCode = (errors?.[0]?.extensions?.code as number) ?? 500;
    return errorCode;
  };

  return { makeApolloClient, getErrorCodeFromGraphQLError };
};
