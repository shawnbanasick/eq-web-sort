import create from "zustand";

import createLocalPanelSlice from "./createLocalPanelSlice";

const useStore = create((set, get) => ({
  ...createLocalPanelSlice(set, get),
}));

export default useStore;
