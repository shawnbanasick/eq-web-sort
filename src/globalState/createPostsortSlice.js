const createPostsortSlice = (set, get) => ({
  resultsPostsort: {},
  statementCommentsObj: {},
  triggerPostsortModal: false,

  setResultsPostsort: (inputValue) => {
    set(() => ({ resultsPostsort: inputValue }));
  },
  setStatementCommentsObj: (inputValue) => {
    set(() => ({ statementCommentsObj: inputValue }));
  },
  setTriggerPostsortModal: (inputValue) => {
    set(() => ({ triggerPostsortModal: inputValue }));
  },
});

export default createPostsortSlice;
