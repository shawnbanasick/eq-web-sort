const createLanguageSettingsSlice = (set, get) => ({
  langObj: {},

  setLangObj: (langObjInput) => {
    set(() => ({ langObj: langObjInput }));
  },
});

export default createLanguageSettingsSlice;
