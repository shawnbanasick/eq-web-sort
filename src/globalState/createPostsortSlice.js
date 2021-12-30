const createPostsortSlice = (set, get) => ({
  resultsPostsort: {},
  statementCommentsObj: {},

  setResultsPostsort: (inputValue) => {
    set(() => ({ resultsPostsort: inputValue }));
  },
  setStatementCommentsObj: (inputValue) => {
    set(() => ({ statementCommentsObj: inputValue }));
  },

  //   setTopMargin: (inputValue) => {
  //     set(() => ({ topMargin: inputValue }));
  //   },
  //   setIsSortingCards: (inputValue) => {
  //     set(() => ({ isSortingCards: inputValue }));
  //   },
  //   setSortCompleted: (inputValue) => {
  //     set(() => ({ sortCompleted: inputValue }));
  //   },
  //   setSortCharacteristics: (inputValue) => {
  //     set(() => ({ sortCharacteristics: inputValue }));
  //   },
  //   setCardHeight: (inputValue) => {
  //     set(() => ({ cardHeight: inputValue }));
  //   },
});

export default createPostsortSlice;
