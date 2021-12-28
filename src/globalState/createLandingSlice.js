const createLandingSlice = (set, get) => ({
  isLoggedIn: false,

  setIsLoggedIn: (inputValue) => {
    set(() => ({ isLoggedIn: inputValue }));
  },
});

export default createLandingSlice;
