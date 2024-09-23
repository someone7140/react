import { create } from "zustand";

type StoreSidebarOpen = {
  isSidebarOpen: boolean;
  setIsOpenSidebar: (openFlag: boolean) => void;
};

export const useSidebarOpen = create<StoreSidebarOpen>((set) => ({
  isSidebarOpen: false,
  setIsOpenSidebar: (openFlag) => set(() => ({ isSidebarOpen: openFlag })),
}));
