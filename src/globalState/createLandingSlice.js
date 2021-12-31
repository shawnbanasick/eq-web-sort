const createLandingSlice = (set, get) => ({
  isLoggedIn: false,
  triggerLandingModal: false,
  usercode: "",
  partId: "",

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
});

export default createLandingSlice;
