"use client";

import { Interceptor } from "@bufbuild/connect";
import { TransportProvider } from "@bufbuild/connect-query";
import { createConnectTransport } from "@bufbuild/connect-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ApiProviderComponent: FC<Props> = ({ children }) => {
  const authInterceptor: Interceptor = (next) => async (req) => {
    /*
    if (token != null) {
      // リクエストヘッダーにトークンをセットする
      req.header.set("Authorization", `Bearer ${token}`);
    }
    */
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
