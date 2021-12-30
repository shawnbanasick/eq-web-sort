const createFooterSlice = (set, get) => ({
  cardFontSize: 15,

  setCardFontSize: (inputValue) => {
    set(() => ({ cardFontSize: inputValue }));
  },
  /*
  setTriggerPresortFinishedModal: (bool) => {
    set(() => ({ triggerPresortFinishedModal: bool }));
  },*/
});

export default createFooterSlice;
