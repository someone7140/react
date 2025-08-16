"use client";

import { FC } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { Toaster as Sonner } from "sonner";

export const ToastComponent: FC = ({}) => {
  return (
    <Sonner
      icons={{
        success: (
          <Icon
            icon="ix:success-filled"
            width="20"
            height="20"
            style={{ color: "#1cd165" }}
          />
        ),
        info: (
          <Icon
            icon="material-symbols:info"
            width="20"
            height="20"
            style={{ color: "#4493d6" }}
          />
        ),
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
