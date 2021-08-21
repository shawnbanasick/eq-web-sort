import { store } from "@risingstack/react-easy-state";

const globalState = store({
  currentPage: "landing",
  presortPosCards: [],
  presortNeuCards: [],
  presortNegCards: [],
  presortCards: [],
  cardFontSize: 15,
  defaultCardFontSize: 15,
  presortSortedStatements: 0,
  progressScore: 10,
  overloadedColumn: "",
  cardHeight: 100,
  dataLoaded: false,
  rating2State: {},
});

export default globalState;
