"use client";

import { FC } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export const GoogleAnalyticsComponent: FC = () => {
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
      )}
    </>
  );
};
