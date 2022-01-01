const createSortSlice = (set, get) => ({
  triggerSortModal: false,
  columnWidth: 100,
  topMargin: 50,
  isSortingCards: true,
  sortCompleted: false,
  sortCharacteristics: {},
  cardHeight: 0,
  isSortingFinished: false,
  hasOverloadedColumn: false,
  triggerSortPreventNavModal: false,
  triggerSortOverloadedColumnModal: false,

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
