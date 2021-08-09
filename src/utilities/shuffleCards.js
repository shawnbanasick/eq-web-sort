import shuffle from "lodash/shuffle";
import getGlobalState from "../globalState/getGlobalState";
import setGlobalState from "../globalState/setGlobalState";

const shuffleCards = () => {
  setGlobalState("presortCards", window.statementsXML);

  // const presortPosCards = getGlobalState("presortPosCards");
  // const presortNeuCards = getGlobalState("presortNeuCards");
  // const presortNegCards = getGlobalState("presortNegCards");

  // if (
  //   presortNegCards.length === 0 &&
  //   presortNeuCards.length === 0 &&
  //   presortPosCards.length === 0
  // ) {
  //   setGlobalState("presortCards", shuffle(window.statementsXML));
  // }
};

export default shuffleCards;
