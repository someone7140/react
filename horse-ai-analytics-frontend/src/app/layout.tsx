import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { HeaderComponent } from "@/components/feature/common/HeaderComponent";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ApiProvider } from "@/provider/ApiProvider";
import "@/styles/globals.css";
import { AuthProvider } from "@/provider/AuthProvider";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "競馬予想AIプロンプトツール",
  description: "競馬予想に使うAIプロンプトを作成するツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
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
