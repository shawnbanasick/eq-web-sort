const createLandingSlice = (set, get) => ({
  isLoggedIn: false,
  triggerLandingModal: false,

  setIsLoggedIn: (inputValue) => {
    set(() => ({ isLoggedIn: inputValue }));
  },
  setTriggerLandingModal: (inputValue) => {
    set(() => ({ triggerLandingModal: inputValue }));
  },
});

export default createLandingSlice;
