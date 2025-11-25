import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UiuxState {
  isSideBarOpen: boolean;
}

interface UiuxActions {
  toggleSideBar: () => void;
}

const storeItem: StateCreator<
  UiuxState & UiuxActions,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (set /* get */) => ({
  isSideBarOpen: false,
  toggleSideBar: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
});

export const useUIUXStore = create<UiuxState & UiuxActions>()(
  devtools(
    persist(storeItem, {
      name: "uiux-storage",
    })
  )
);
