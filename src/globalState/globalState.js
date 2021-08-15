import { store } from "@risingstack/react-easy-state";

const globalState = store({
  currentPage: "landing",
  presortPosCards: [],
  presortNeuCards: [],
  presortNegCards: [],
  presortCards: [],
  cardFontSize: "18px",
  defaultCardFontSize: 15,
  presortSortedStatements: 0,
  progressScore: 10,
  overloadedColumn: "",
  cardHeight: 100,
  dataLoaded: false,
});

export default globalState;
