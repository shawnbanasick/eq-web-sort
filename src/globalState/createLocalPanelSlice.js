const createLocalPanelSlice = (set, get) => ({
  displayLocalPartIdWarning1: false,
  displayLocalPartIdWarning2: false,
  triggerLocalDeleteModal: false,
  localStoredQsorts: [],
  localParticipantName: "",

  setLocalParticipantName: (inputValue) => {
    set(() => ({ localParticipantName: inputValue }));
  },
  setLocalStoredQsorts: (inputValue) => {
    set(() => ({ localStoredQsorts: inputValue }));
  },
  setLocalPartIdWarning1: (bool) => {
    set(() => ({ displayLocalPartIdWarning1: bool }));
  },
  setLocalPartIdWarning2: (bool) => {
    set(() => ({ displayLocalPartIdWarning2: bool }));
  },
  setLocalDeleteModal: (bool) => {
    set(() => ({ triggerLocalDeleteModal: bool }));
  },
});

export default createLocalPanelSlice;
