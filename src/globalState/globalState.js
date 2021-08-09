import { store } from "@risingstack/react-easy-state";

const globalState = store({
  currentPage: "landing",
  presortPosCards: [],
  presortNeuCards: [],
  presortNegCards: [],
  presortCards: [],
});

export default globalState;
