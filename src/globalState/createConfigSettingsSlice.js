const createConfigSettingsSlice = (set, get) => ({
  configObj: {},
  surveyQuestionObjArray: [],
  requiredAnswersObj: {},

  setConfigObj: (configObjInput) => {
    set(() => ({ configObj: configObjInput }));
  },
  setSurveyQuestionObjArray: (configObjInput) => {
    set(() => ({ surveyQuestionObjArray: configObjInput }));
  },
  setRequiredAnswersObj: (configObjInput) => {
    set(() => ({ requiredAnswersObj: configObjInput }));
  },
});

export default createConfigSettingsSlice;
