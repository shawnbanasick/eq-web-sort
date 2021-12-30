const createPresortSlice = (set, get) => ({
  presortNoReturn: false,
  presortPosCards: [],
  presortNeuCards: [],
  presortNegCards: [],
  presortCards: [],
  presortSortedStatementsNumInitial: 0,
  presortFinished: false,
  triggerPresortFinishedModal: false,
  triggerPresortPreventNavModal: false,
  results: {},

  setPresortNoReturn: (inputValue) => {
    set(() => ({ presortNoReturn: inputValue }));
  },
  setPresortPosCards: (inputValue) => {
    set(() => ({ presortPosCards: inputValue }));
  },
  setPresortNeuCards: (inputValue) => {
    set(() => ({ presortNeuCards: inputValue }));
  },
  setPresortNegCards: (inputValue) => {
    set(() => ({ presortNegCards: inputValue }));
  },
  setPresortCards: (inputValue) => {
    set(() => ({ presortCards: inputValue }));
  },
  setPresortSortedStatementsNumInitial: (inputValue) => {
    set(() => ({ presortSortedStatementsNumInitial: inputValue }));
  },
  setPresortFinished: (bool) => {
    set(() => ({ presortFinished: bool }));
  },
  setTriggerPresortFinishedModal: (bool) => {
    set(() => ({ triggerPresortFinishedModal: bool }));
  },
  setTriggerPresortPreventNavModal: (bool) => {
    set(() => ({ triggerPresortPreventNavModal: bool }));
  },
  setResults: (inputValue) => {
    set(() => ({ results: inputValue }));
  },
});

export default createPresortSlice;
