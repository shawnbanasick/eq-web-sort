import { store } from "@risingstack/react-easy-state";

const globalState = store({
  cardFontSize: 15,
  cardHeight: 0,
  checkRequiredQuestionsComplete: false,
  currentPage: "landing",
  dataLoaded: false,
  defaultCardFontSize: 15,
  displayAccessCodeWarning: false,
  displayContinueButton: false,
  displayLandingContent: false,
  displayNextButton: false,
  displayPartIdWarning: false,
  displaySubmitFallback: false,
  displayGoodbyeMessage: false,
  hasOverloadedColumn: false,
  isLoggedIn: false,
  overloadedColumn: "",
  partId: "anonymous",
  presortPosCards: [],
  presortNeuCards: [],
  presortNegCards: [],
  presortCards: [],
  presortSortedStatements: 0,
  presortFinished: false,
  presortNoReturn: false,
  progressScore: 10,
  progressScoreAdditional: 0,
  progressScoreAdditionalSort: 0,
  rating2State: {},
  requiredAnswersObj: {},
  results: {},
  resultsPostsort: {},
  resultsSurvey: {},
  sortFinished: false,
  sortFinishedModalHasBeenShown: false,
  sortGridResults: {},
  statementCommentsObj: {},
  submitFailNumber: 0,
  triggerLandingModal: false,
  triggerPresortModal: true,
  triggerPresortPreventNavModal: false,
  triggerPresortFinishedModal: false,
  triggerSortModal: true,
  triggerPostsortModal: true,
  triggerSortingFinishedModal: false,
  triggerSortPreventNavModal: false,
  triggerSortOverloadedColumnModal: false,
  triggerSurveyModal: true,
  triggerSurveyPreventNavModal: false,
  triggerTransmissionOKModal: false,
  triggerTransmissionFailModal: false,
  userInputPartId: "",
  userInputAccessCode: "",
});

export default globalState;
