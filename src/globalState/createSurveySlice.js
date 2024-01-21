const createSurveySlice = (set, get) => ({
  triggerSurveyModal: true,
  resultsSurvey: {},
  triggerSurveyPreventNavModal: false,
  checkRequiredQuestionsComplete: false,
  requiredAnswersObj: {},
  answersStorage: {},

  setAnswersStorage: (inputValue) => {
    set(() => ({ answersStorage: inputValue }));
  },
  setTriggerSurveyModal: (inputValue) => {
    set(() => ({ triggerSurveyModal: inputValue }));
  },
  setResultsSurvey: (inputValue) => {
    set(() => ({ resultsSurvey: inputValue }));
  },

  setTriggerSurveyPreventNavModal: (inputValue) => {
    set(() => ({ triggerSurveyPreventNavModal: inputValue }));
  },
  setCheckRequiredQuestionsComplete: (inputValue) => {
    set(() => ({ checkRequiredQuestionsComplete: inputValue }));
  },
  setRequiredAnswersObj: (inputValue) => {
    set(() => ({ requiredAnswersObj: inputValue }));
  },
});

export default createSurveySlice;
