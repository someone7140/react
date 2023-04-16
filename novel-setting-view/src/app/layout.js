"use client";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import HeaderComponent from "components/common/HeaderComponent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <html>
        <head>
          <title>小説作成支援ツール</title>
        </head>
        <body
          style={{
            margin: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <header
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
              }}
            >
              <HeaderComponent />
            </header>
            <main
              style={{
                flex: 1,
                marginTop: 15,
              }}
            >
              {children}
            </main>
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
