"use client";

import React, { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Interceptor } from "@bufbuild/connect";
import { TransportProvider } from "@bufbuild/connect-query";
import { createConnectTransport } from "@bufbuild/connect-web";
import { useAuthTokenLocalStorage } from "@/hooks/useAuthTokenLocalStorage";

type Props = {
  children: ReactNode;
};

export const ApiProviderComponent: FC<Props> = ({ children }) => {
  const { authToken } = useAuthTokenLocalStorage();
  const authInterceptor: Interceptor = (next) => async (req) => {
    if (authToken != null) {
      // リクエストヘッダーにトークンをセットする
      req.header.set("Authorization", authToken);
    }
    return await next(req);
  };

  const transport = createConnectTransport({
    baseUrl: process.env.NEXT_PUBLIC_API_DOMAIN ?? "",
    interceptors: [authInterceptor],
  });

  const queryClient = new QueryClient();

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TransportProvider>
  );
};
