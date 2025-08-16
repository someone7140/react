"use client";

import { FC } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

export const LoadingComponent: FC = ({}) => {
  return (
    <Icon
      icon="line-md:loading-loop"
      width="30"
      height="30"
      style={{ color: "#1cccd1" }}
    />
  );
};
