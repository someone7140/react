import { ApolloLink, createHttpLink } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: `${process.env.NEXT_PUBLIC_API_NEXTJS_DOMAIN}/api`,
});

const getGraphQLLink = (headers: Record<string, string>) => {
  return createHttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
    headers,
  });
};

export const getApolloLink = (graphQLHeaders: Record<string, string>) => {
  return ApolloLink.from([restLink, getGraphQLLink(graphQLHeaders)]);
};
