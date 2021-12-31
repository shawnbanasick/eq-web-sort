const createSurveySlice = (set, get) => ({
  triggerSurveyModal: false,

  setTriggerSurveyModal: (inputValue) => {
    set(() => ({ triggerSurveyModal: inputValue }));
  },
});

export default createSurveySlice;
