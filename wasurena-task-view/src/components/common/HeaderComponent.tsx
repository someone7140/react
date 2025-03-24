import { FC } from "react";

import { MenuComponent } from "./MenuComponent";

export const HeaderComponent: FC = ({}) => {
  return (
    <header className="sticky top-0 z-10 h-[60px] max-w-full rounded-none bg-cyan-50 px-3 py-3 mb-1">
      <div className="flex items-center gap-8 h-[35px]">
        <div>
          <MenuComponent />
        </div>
        <div className="text-lg">わすれなタスク</div>
      </div>
    </header>
  );
};
