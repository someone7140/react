import { ApolloLink, createHttpLink } from "@apollo/client";

const getGraphQLLink = (headers: Record<string, string>) => {
  return createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_GRAPHQL}/graphql`,
    headers,
  });
};

export const getApolloLink = (graphQLHeaders: Record<string, string>) => {
  return ApolloLink.from([getGraphQLLink(graphQLHeaders)]);
};
