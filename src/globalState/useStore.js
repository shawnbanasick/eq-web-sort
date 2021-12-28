import create from "zustand";
import createLocalPanelSlice from "./createLocalPanelSlice";
import createPresortSlice from "./createPresortSlice";
import createLandingSlice from "./createLandingSlice";

const useStore = create((set, get) => ({
  ...createLocalPanelSlice(set, get),
  ...createLandingSlice(set, get),
  ...createPresortSlice(set, get),
}));

export default useStore;
