const createLandingSlice = (set, get) => ({
  isLoggedIn: false,
  triggerLandingModal: false,
  usercode: "",
  partId: "",
  localUsercode: "",
  displayAccessCodeWarning: false,
  userInputAccessCode: "",
  displayLandingContent: false,

  setIsLoggedIn: (inputValue) => {
    set(() => ({ isLoggedIn: inputValue }));
  },
  setTriggerLandingModal: (inputValue) => {
    set(() => ({ triggerLandingModal: inputValue }));
  },
  setUsercode: (inputValue) => {
    set(() => ({ usercode: inputValue }));
  },
  setPartId: (inputValue) => {
    set(() => ({ partId: inputValue }));
  },
  setLocalUsercode: (input) => {
    set(() => ({ localUsercode: input }));
  },
  setDisplayAccessCodeWarning: (input) => {
    set(() => ({ displayAccessCodeWarning: input }));
  },
  setUserInputAccessCode: (input) => {
    set(() => ({ userInputAccessCode: input }));
  },
  setDisplayLandingContent: (input) => {
    set(() => ({ displayLandingContent: input }));
  },
});

export default createLandingSlice;
