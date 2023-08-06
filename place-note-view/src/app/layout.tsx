import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ApiProviderComponent } from "@/components/common/ApiProviderComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "私の訪問記録",
  description: "訪れた場所を記録するWebサービスです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApiProviderComponent>{children}</ApiProviderComponent>
      </body>
    </html>
  );
}
