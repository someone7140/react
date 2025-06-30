import {
  cacheExchange,
  CombinedError,
  createClient,
  fetchExchange,
  ssrExchange,
} from "urql";
import customScalarsExchange from "@atmina/urql-custom-scalars-exchange";

import schema from "@/graphql/gen/introspection.json";

export enum ErrorClassification {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export const useApiManagement = () => {
  const scalarsExchange = customScalarsExchange({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: schema as any, // 型エラーになるのでanyにしておく
    scalars: {
      DateTime(value) {
        return new Date(value);
      },
    },
  });

  // SSR exchangeを作成
  const ssrCache = ssrExchange({
    isClient: typeof window !== "undefined",
    initialState:
      typeof window !== "undefined"
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).__URQL_INITIAL_STATE__
        : undefined,
  });

  // urqlクライアント作成関数
  const createUrqlClient = (token?: string) => {
    return createClient({
      url: `${process.env.NEXT_PUBLIC_API_URL}`,
      exchanges: [scalarsExchange, cacheExchange, ssrCache, fetchExchange],
      fetchOptions: () => ({
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }),
    });
  };

  // urqlのgraphqlエラーからコードを取得
  const getErrorCodeFromGraphQLError = (error?: CombinedError) => {
    // errorが空の場合は500
    if (!error) {
      return ErrorClassification.INTERNAL_ERROR;
    }
    // graphqlErrorsの配列が空の場合は500固定
    if (error.graphQLErrors.length === 0) {
      return ErrorClassification.INTERNAL_ERROR;
    }
    // エラーの配列の一つ目にエラーコードが入る前提
    return error.graphQLErrors[0].extensions
      .classification as ErrorClassification;
  };

  return { ssrCache, createUrqlClient, getErrorCodeFromGraphQLError };
};
