"use client";

import { FC } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Toaster as Sonner } from "sonner";

export const ToastComponent: FC = ({}) => {
  return (
    <Sonner
      icons={{
        error: (
          <Icon
            icon="ri:error-warning-fill"
            width="20"
            height="20"
            style={{ color: "red" }}
          />
        ),
      }}
    />
  );
};
