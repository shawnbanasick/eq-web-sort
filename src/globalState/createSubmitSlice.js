const createSubmitSlice = (set, get) => ({
  displaySubmitFallback: false,
  displayGoodbyeMessage: false,

  setDisplaySubmitFallback: (input) => {
    set(() => ({ displaySubmitFallback: input }));
  },
  setDisplayGoodbyeMessage: (inputValue) => {
    set(() => ({ displayGoodbyeMessage: inputValue }));
  },
});

export default createSubmitSlice;
