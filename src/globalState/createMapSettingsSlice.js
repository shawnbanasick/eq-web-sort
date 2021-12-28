const createMapSettingsSlice = (set, get) => ({
  mapObj: {},

  setMapObj: (mapObjInput) => {
    set(() => ({ mapObj: mapObjInput }));
  },
});

export default createMapSettingsSlice;
