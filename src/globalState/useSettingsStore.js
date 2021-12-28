import create from "zustand";
import createConfigSettingsSlice from "./createConfigSettingsSlice";
import createLanguageSettingsSlice from "./createLanguageSettingsSlice";
import createMapSettingsSlice from "./createMapSettingsSlice";

const useSettingsStore = create((set, get) => ({
  ...createConfigSettingsSlice(set, get),
  ...createLanguageSettingsSlice(set, get),
  ...createMapSettingsSlice(set, get),
}));

export default useSettingsStore;
