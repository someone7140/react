import { ApolloLink } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: `${process.env.NEXT_PUBLIC_API_NEXTJS_DOMAIN}/api`,
});

export const apolloLink = ApolloLink.from([restLink]);
