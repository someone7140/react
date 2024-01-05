import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { getApolloLink } from "@/constants/ApolloLinkConstants";

export const { getClient: getHasuraClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: getApolloLink({
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET ?? "",
    }),
  });
});
