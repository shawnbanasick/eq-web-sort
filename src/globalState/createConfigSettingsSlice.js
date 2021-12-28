const createConfigSettingsSlice = (set, get) => ({
  configObj: {},

  setConfigObj: (configObjInput) => {
    set(() => ({ configObj: configObjInput }));
  },
});

export default createConfigSettingsSlice;
