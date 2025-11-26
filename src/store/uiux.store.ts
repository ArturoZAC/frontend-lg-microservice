import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UiuxState {
  title: string;
}

interface UiuxActions {
  setTitle: (word: string) => void;
}

const storeUiux: StateCreator<UiuxState & UiuxActions> = (set) => ({
  title: "",
  setTitle: (word: string) => set({ title: word }),
});

export const useUiuxStore = create<UiuxState & UiuxActions>()(
  devtools(
    persist(storeUiux, {
      name: "uiux-storage",
    })
  )
);
