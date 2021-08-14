import { store } from "@risingstack/react-easy-state";

const globalState = store({
  currentPage: "landing",
  presortPosCards: [],
  presortNeuCards: [],
  presortNegCards: [],
  presortCards: [],
  cardFontSize: "18px",
  defaultCardFontSize: 18,
  presortSortedStatements: 0,
  progressScore: 10,
  overloadedColumn: "",
  cardHeight: 0,
  dataLoaded: false,
});

export default globalState;
