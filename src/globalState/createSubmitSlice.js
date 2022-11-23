const createSubmitSlice = (set, get) => ({
  displaySubmitFallback: false,
  displayGoodbyeMessage: false,
  triggerLocalSubmitSuccessModal: false,
  triggerTransmissionOKModal: false,
  triggerTransmissionFailModal: false,
  submitFailNumber: 0,
  transmittingData: false,
  checkInternetConnection: false,

  setCheckInternetConnection: (input) => {
    set(() => ({ checkInternetConnection: input }));
  },
  setTransmittingData: (input) => {
    set(() => ({ transmittingData: input }));
  },
  setTriggerTransmissionFailModal: (input) => {
    set(() => ({ triggerTransmissionFailModal: input }));
  },
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
