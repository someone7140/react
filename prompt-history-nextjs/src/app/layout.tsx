import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { HeaderComponent } from "@/components/feature/common/HeaderComponent";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import { ApiProvider } from "@/provider/ApiProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import "@/styles/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AIプロンプト管理ツール",
  description: "AIのプロンプトに入れた質問と回答を管理するツール",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        <ApiProvider>
          <AuthProvider>
            <HeaderComponent>{children}</HeaderComponent>
          </AuthProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
