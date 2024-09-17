"use client";

import { FC, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";

export const SidebarComponent: FC = ({}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpen = () => {
    isSidebarOpen ? setIsSidebarOpen(false) : setIsSidebarOpen(true);
  };

  return (
    <>
      <IconButton variant="text" size="lg" onClick={handleOpen}>
        {isSidebarOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
    </>
  );
};
