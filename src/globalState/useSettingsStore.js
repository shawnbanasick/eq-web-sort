import create from "zustand";

import createConfigSettingsSlice from "./createConfigSettingsSlice";
import createLanguageSettingsSlice from "./createLanguageSettingsSlice";

const useSettingsStore = create((set, get) => ({
  ...createConfigSettingsSlice(set, get),
  ...createLanguageSettingsSlice(set, get),
}));

export default useSettingsStore;
