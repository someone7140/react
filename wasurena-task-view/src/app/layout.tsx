import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider as JotaiProvider } from "jotai";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import ogImage from "./ogp-image.png";
import { GoogleAnalyticsComponent } from "@/components/common/GoogleAnalyticsComponent";
import { HeaderComponent } from "@/components/common/HeaderComponent";
import { ApiProvider } from "@/provider/ApiProvider";
import { AuthProvider } from "@/provider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "わすれなタスク",
  description: "定期的なタスクを忘れないように管理や通知するツール",
  openGraph: {
    title: "わすれなタスク",
    description:
      "わすれなタスクは、定期的なタスクを忘れないように管理や通知するツールです",
    siteName: "わすれなタスク",
    images: [ogImage.src],
  },
  twitter: {
    card: "summary",
    title: "わすれなタスク",
    description:
      "わすれなタスクは、定期的なタスクを忘れないように管理や通知するツールです",
    images: [ogImage.src],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" {...mantineHtmlProps}>
      <head>
        <GoogleAnalyticsComponent />
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JotaiProvider>
          <MantineProvider>
            <Notifications />
            <ApiProvider>
              <AuthProvider>
                <HeaderComponent />
                <div className="flex justify-center">
                  <div className="max-w-[95%] min-w-[300px]">
                    <div className="flex justify-start w-[100%] ml-3 mb-4">
                      <div>{children}</div>
                    </div>
                  </div>
                </div>
              </AuthProvider>
            </ApiProvider>
          </MantineProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
