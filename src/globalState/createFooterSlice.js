const createFooterSlice = (set, get) => ({
  cardFontSizePresort: 5,
  cardFontSizeSort: 5,
  cardFontSizePostsort: 5,
  currentPage: "landing",
  progressScore: 10,
  progressScoreAdditional: 0,
  progressScoreAdditionalSort: 0,
  displayNextButton: false,
  minCardHeightSort: 40,
  minCardHeightPostsort: 40,

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
