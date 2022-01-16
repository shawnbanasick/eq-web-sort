const createSubmitSlice = (set, get) => ({
  displaySubmitFallback: false,
  displayGoodbyeMessage: false,
  triggerLocalSubmitSuccessModal: false,
  triggerTransmissionOKModal: false,

  setTriggerTransmissionOKModal: (input) => {
    set(() => ({ triggerTransmissionOKModal: input }));
  },
  setTriggerLocalSubmitSuccessModal: (input) => {
    set(() => ({ triggerLocalSubmitSuccessModal: input }));
  },
  setDisplaySubmitFallback: (input) => {
    set(() => ({ displaySubmitFallback: input }));
  },
  setDisplayGoodbyeMessage: (inputValue) => {
    set(() => ({ displayGoodbyeMessage: inputValue }));
  },
});

export default createSubmitSlice;
