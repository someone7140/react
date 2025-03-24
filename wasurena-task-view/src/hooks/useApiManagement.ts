import { cacheExchange, createClient, fetchExchange, ssrExchange } from "urql";

export const useApiManagement = () => {
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

  return { ssrCache, createUrqlClient };
};
