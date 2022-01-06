const createSortSlice = (set, get) => ({
  cardHeight: 0,
  columnWidth: 100,
  hasOverloadedColumn: false,
  isSortingCards: true,
  isSortingFinished: false,
  overloadedColumn: "",
  sortCompleted: false,
  sortFinished: false,
  sortFinishedModalHasBeenShown: false,
  sortCharacteristics: {},
  topMargin: 50,
  triggerSortModal: false,
  triggerSortPreventNavModal: false,
  triggerSortOverloadedColumnModal: false,
  triggerSortingFinishedModal: false,
  sortGridResults: {},

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
  setCardHeight: (inputValue) => {
    set(() => ({ cardHeight: inputValue }));
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
