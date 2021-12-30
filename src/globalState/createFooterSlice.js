const createFooterSlice = (set, get) => ({
  cardFontSize: 15,
  currentPage: "landing",
  progressScore: 10,
  progressScoreAdditional: 0,
  progressScoreAdditionalSort: 0,

  setCardFontSize: (inputValue) => {
    set(() => ({ cardFontSize: inputValue }));
  },
  setCurrentPage: (inputValue) => {
    set(() => ({ currentPage: inputValue }));
  },
  setProgressScore: (inputValue) => {
    set(() => ({ progressScore: inputValue }));
  },
  setProgressScoreAdditional: (inputValue) => {
    set(() => ({ progressScoreAdditional: inputValue }));
  },
  setProgressScoreAdditionalSort: (inputValue) => {
    set(() => ({ progressScoreAdditionalSort: inputValue }));
  },
});

export default createFooterSlice;
