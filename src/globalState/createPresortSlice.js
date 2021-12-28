const createPresortSlice = (set, get) => ({
  cardFontSize: 15,
  presortNoReturn: false,

  setCardFontSize: (inputValue) => {
    set(() => ({ cardFontSize: inputValue }));
  },
  setPresortNoReturn: (inputValue) => {
    set(() => ({ presortNoReturn: inputValue }));
  },
});

export default createPresortSlice;
