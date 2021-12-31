const createSubmitSlice = (set, get) => ({
  displaySubmitFallback: false,

  setDisplaySubmitFallback: (input) => {
    set(() => ({ displaySubmitFallback: input }));
  },
});

export default createSubmitSlice;
