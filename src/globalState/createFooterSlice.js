const createFooterSlice = (set, get) => ({
  cardFontSize: 15,
  currentPage: "landing",
  progressScore: 10,

  setCardFontSize: (inputValue) => {
    set(() => ({ cardFontSize: inputValue }));
  },
  setCurrentPage: (inputValue) => {
    set(() => ({ currentPage: inputValue }));
  },
  setProgressScore: (inputValue) => {
    set(() => ({ progressScore: inputValue }));
  },
});

export default createFooterSlice;
