import {
  cacheExchange,
  CombinedError,
  createClient,
  fetchExchange,
  ssrExchange,
} from "urql";

export const useApiManagement = () => {
  // Mapをオブジェクトに変換

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
      exchanges: [cacheExchange, ssrCache, fetchExchange],
      fetchOptions: () => ({
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }),
    });
  };

  // urqlのgraphqlエラーからコードを取得
  const getErrorCodeFromGraphQLError = (error?: CombinedError): number => {
    // errorが空の場合は200
    if (!error) {
      return 500;
    }
    // graphqlErrorsの配列が空の場合は500固定
    if (error.graphQLErrors.length === 0) {
      return 500;
    }
    // エラーの配列の一つ目にエラーコードが入る前提
    return error.graphQLErrors[0].extensions.code as number;
  };

  return { ssrCache, createUrqlClient, getErrorCodeFromGraphQLError };
};
