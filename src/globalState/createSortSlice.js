const createSortSlice = (set, get) => ({
  cardHeightSort: 120,
  cardHeightPostsort: 120,
  columnWidth: 100,
  draggingOverColumnId: "",
  hasOverloadedColumn: false,
  isSortingCards: true,
  isSortingFinished: false,
  overloadedColumn: "",
  sortCompleted: false,
  sortFinished: false,
  sortFinishedModalHasBeenShown: false,
  sortCharacteristics: {},
  topMargin: 50,
  triggerSortModal: true,
  triggerSortPreventNavModal: false,
  triggerSortOverloadedColumnModal: false,
  triggerSortingFinishedModal: false,
  sortGridResults: {},
  bypassSort: false,
  bypassPresort: false,

  setBypassPresort: (inputValue) => {
    set(() => ({ bypassPresort: inputValue }));
  },
  setBypassSort: (inputValue) => {
    set(() => ({ bypassSort: inputValue }));
  },
  setDraggingOverColumnId: (inputValue) => {
    set(() => ({ draggingOverColumnId: inputValue }));
  },
  setOverloadedColumn: (inputValue) => {
    set(() => ({ overloadedColumn: inputValue }));
  },
  setTriggerSortingFinishedModal: (inputValue) => {
    set(() => ({ triggerSortingFinishedModal: inputValue }));
  },
  setSortGridResults: (inputValue) => {
    set(() => ({ sortGridResults: inputValue }));
  },
  setColumnWidth: (inputValue) => {
    set(() => ({ columnWidth: inputValue }));
  },
  setTopMargin: (inputValue) => {
    set(() => ({ topMargin: inputValue }));
  },
  setIsSortingCards: (inputValue) => {
    set(() => ({ isSortingCards: inputValue }));
  },
  setSortCompleted: (inputValue) => {
    set(() => ({ sortCompleted: inputValue }));
  },
  setSortFinished: (inputValue) => {
    set(() => ({ sortFinished: inputValue }));
  },
  setSortFinishedModalHasBeenShown: (inputValue) => {
    set(() => ({ sortFinishedModalHasBeenShown: inputValue }));
  },
  setSortCharacteristics: (inputValue) => {
    set(() => ({ sortCharacteristics: inputValue }));
  },
  setCardHeightSort: (inputValue) => {
    set(() => ({ cardHeightSort: inputValue }));
  },
  setCardHeightPostsort: (inputValue) => {
    set(() => ({ cardHeightPostsort: inputValue }));
  },
  setTriggerSortModal: (inputValue) => {
    set(() => ({ triggerSortModal: inputValue }));
  },
  setIsSortingFinished: (inputValue) => {
    set(() => ({ isSortingFinished: inputValue }));
  },
  setHasOverloadedColumn: (inputValue) => {
    set(() => ({ hasOverloadedColumn: inputValue }));
  },
  setTriggerSortPreventNavModal: (inputValue) => {
    set(() => ({ triggerSortPreventNavModal: inputValue }));
  },
  setTriggerSortOverloadedColumnModal: (inputValue) => {
    set(() => ({ triggerSortOverloadedColumnModal: inputValue }));
  },
});

export default createSortSlice;
