"use client";

import { FC } from "react";
import { Navbar, Typography } from "@material-tailwind/react";

export const HeaderComponent: FC = ({}) => {
  return (
    <>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none bg-cyan-50">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div>
            <Typography className="mr-4 font-medium">Placeノート</Typography>
          </div>
        </div>
      </Navbar>
    </>
  );
};
