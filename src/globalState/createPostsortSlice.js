const createPostsortSlice = (set, get) => ({
  resultsPostsort: {},
  statementCommentsObj: {},
  triggerPostsortModal: true,
  postsortCommentCheckObj: {},
  showPostsortCommentHighlighting: false,
  triggerPostsortPreventNavModal: false,
  postsortDualImageArray: [],

  setPostsortDualImageArray: (inputValue) => {
    set(() => ({ postsortDualImageArray: inputValue }));
  },
  setResultsPostsort: (inputValue) => {
    set(() => ({ resultsPostsort: inputValue }));
  },
  setStatementCommentsObj: (inputValue) => {
    set(() => ({ statementCommentsObj: inputValue }));
  },
  setTriggerPostsortModal: (inputValue) => {
    set(() => ({ triggerPostsortModal: inputValue }));
  },
  setPostsortCommentCheckObj: (inputValue) => {
    set(() => ({ postsortCommentCheckObj: inputValue }));
  },
  setShowPostsortCommentHighlighting: (inputValue) => {
    set(() => ({ showPostsortCommentHighlighting: inputValue }));
  },
  setTriggerPostsortPreventNavModal: (inputValue) => {
    set(() => ({ triggerPostsortPreventNavModal: inputValue }));
  },
});

export default createPostsortSlice;
