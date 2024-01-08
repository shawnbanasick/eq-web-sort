const createFooterSlice = (set, get) => ({
  cardFontSizePresort: 15,
  cardFontSizeSort: 15,
  cardFontSizePostsort: 15,
  currentPage: "landing",
  progressScore: 10,
  progressScoreAdditional: 0,
  progressScoreAdditionalSort: 0,
  displayNextButton: false,
  minCardHeightSort: 120,
  minCardHeightPostsort: 120,

  setMinCardHeightPostsort: (inputValue) => {
    set(() => ({ minCardHeightPostsort: inputValue }));
  },
  setMinCardHeightSort: (inputValue) => {
    set(() => ({ minCardHeightSort: inputValue }));
  },
  setCardFontSizePostsort: (inputValue) => {
    set(() => ({ cardFontSizePostsort: inputValue }));
  },
  setCardFontSizeSort: (inputValue) => {
    set(() => ({ cardFontSizeSort: inputValue }));
  },
  setCardFontSizePresort: (inputValue) => {
    set(() => ({ cardFontSizePresort: inputValue }));
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
  setDisplayNextButton: (inputValue) => {
    set(() => ({ displayNextButton: inputValue }));
  },
});

export default createFooterSlice;
