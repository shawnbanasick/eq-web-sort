const createSortSlice = (set, get) => ({
  columnWidth: 100,
  topMargin: 50,
  isSortingCards: true,
  sortCompleted: false,
  sortCharacteristics: {},
  cardHeight: 0,

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
});

export default createSortSlice;
