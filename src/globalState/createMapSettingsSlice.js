const createMapSettingsSlice = (set, get) => ({
  // includes qSortPattern, qSortHeaderNumbers, etc...
  mapObj: {},

  setMapObj: (mapObjInput) => {
    set(() => ({ mapObj: mapObjInput }));
  },
});

export default createMapSettingsSlice;
