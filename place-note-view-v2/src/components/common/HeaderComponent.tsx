"use client";

import { FC } from "react";
import { Navbar, Typography } from "@material-tailwind/react";

import { SidebarComponent } from "@/components/common/SidebarComponent";

export const HeaderComponent: FC = ({}) => {
  return (
    <>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none bg-cyan-50 px-3 py-3">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-4">
            <SidebarComponent />
            <Typography variant="h5">Placeノート</Typography>
          </div>
        </div>
      </Navbar>
    </>
  );
};
