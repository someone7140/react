import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ogImage from "./ogp-image.png";
import { GoogleAnalyticsComponent } from "@/components/common/GoogleAnalyticsComponent";
import { HeaderComponent } from "@/components/common/HeaderComponent";
import { SidebarComponent } from "@/components/menu/SidebarComponent";
import { ApiProvider } from "@/provider/ApiProvider";
import { AuthProvider } from "@/provider/AuthProvider";
import "@/style/globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Placeノート",
  description: "訪れた場所を記録するツール",
  openGraph: {
    title: "Placeノート",
    description: "Placeノートは、訪れた場所のメモや共有ができるサービスです",
    siteName: "Placeノート",
    images: [ogImage.src],
  },
  twitter: {
    card: "summary",
    title: "Placeノート",
    description: "Placeノートは、訪れた場所のメモや共有ができるサービスです",
    images: [ogImage.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalyticsComponent />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApiProvider>
          <AuthProvider>
            <HeaderComponent />
            <SidebarComponent />
            <div className="flex justify-center mt-4">
              <div className="max-w-[95%] min-w-[300px]">
                <div className="flex justify-start w-[100%] ml-3 mb-4">
                  <div>{children}</div>
                </div>
              </div>
            </div>
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
          </AuthProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
