const createPostsortSlice = (set, get) => ({
  resultsPostsort: {},
  statementCommentsObj: {},
  triggerPostsortModal: false,
  postsortCommentCheckObj: {},
  showPostsortCommentHighlighting: false,
  triggerPostsortPreventNavModal: false,

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
