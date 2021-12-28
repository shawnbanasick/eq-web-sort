import create from "zustand";
import createConfigSettingsSlice from "./createConfigSettingsSlice";
import createLanguageSettingsSlice from "./createLanguageSettingsSlice";
import createMapSettingsSlice from "./createMapSettingsSlice";
import createStatementsSettingsSlice from "./createStatementsSettingsSlice";

const useSettingsStore = create((set, get) => ({
  ...createConfigSettingsSlice(set, get),
  ...createLanguageSettingsSlice(set, get),
  ...createMapSettingsSlice(set, get),
  ...createStatementsSettingsSlice(set, get),
}));

export default useSettingsStore;
