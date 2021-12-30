const createFooterSlice = (set, get) => ({
  columnWidth: 100,
  topMargin: 50,

  setColumnWidth: (inputValue) => {
    set(() => ({ columnWidth: inputValue }));
  },
  setTopMargin: (inputValue) => {
    set(() => ({ topMargin: inputValue }));
  },
});

export default createFooterSlice;
