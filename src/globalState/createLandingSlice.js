const createLandingSlice = (set, get) => ({
  dataLoaded: false,
  isLoggedIn: false,
  triggerLandingModal: false,
  triggerConsentModal: false,
  usercode: "",
  urlUsercode: "not set",
  partId: "not required",
  localUsercode: "",
  displayAccessCodeWarning: false,
  userInputAccessCode: "",
  displayLandingContent: false,
  triggerSaveBeforeDeleteModal: false,
  userInputPartId: "",
  displayPartIdWarning: false,

  setTriggerConsentModal: (inputValue) => {
    set(() => ({ triggerConsentModal: inputValue }));
  },
  setUrlUsercode: (inputValue) => {
    set(() => ({ urlUsercode: inputValue }));
  },
  setDisplayPartIdWarning: (inputValue) => {
    set(() => ({ displayPartIdWarning: inputValue }));
  },
  setUserInputPartId: (inputValue) => {
    set(() => ({ userInputPartId: inputValue }));
  },
  setTriggerSaveBeforeDeleteModal: (inputValue) => {
    set(() => ({ triggerSaveBeforeDeleteModal: inputValue }));
  },
  setDataLoaded: (inputValue) => {
    set(() => ({ dataLoaded: inputValue }));
  },
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
