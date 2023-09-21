import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApiProviderComponent } from "@/components/common/provider/ApiProviderComponent";
import { AuthProviderComponent } from "@/components/common/provider/AuthProviderComponent";
import { HeaderComponent } from "@/components/common/HeaderComponent";

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
        <ApiProviderComponent>
          <AuthProviderComponent>
            <HeaderComponent>{children}</HeaderComponent>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AuthProviderComponent>
        </ApiProviderComponent>
      </body>
    </html>
  );
}
