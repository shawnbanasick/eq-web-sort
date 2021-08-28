import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const calculateDragResults = (result) => {
  try {
    // const sortGridResults = getGlobalState("sortGridResults");
    const configObj = getGlobalState("configObj");
    const results = getGlobalState("results");
    const sortFinishedModalHasBeenShown = getGlobalState(
      "sortFinishedModalHasBeenShown"
    );
    const totalStatements = configObj.totalStatements;
    const sortGridResults =
      JSON.parse(localStorage.getItem("sortGridResults")) || {};

    // derive sortValue from droppableId
    const replaceColumn = /column/gi;
    const replaceN = /N/gi;
    let sortValue1 = result.destination.droppableId;
    sortValue1 = sortValue1.replace(replaceColumn, "");
    sortValue1 = sortValue1.replace(replaceN, "-");
    const sortValue = parseInt(sortValue1, 10);

    // assign key (like "s1") and value (sortValue like "-4")
    sortGridResults[result.draggableId] = sortValue;
    //   sortGridResults[result.draggableId] = result.destination.droppableId;

    // create results string
    const testForCompleteArray = Object.keys(sortGridResults);
    if (testForCompleteArray.length === totalStatements) {
      let resultsText = "";
      for (let i = 0; i < totalStatements; i++) {
        let key = `s${i + 1}`;
        let newValue = sortGridResults[key];
        resultsText += `${newValue}|`;
      }
      // remove trailing bar
      if (resultsText.charAt(resultsText.length - 1) === "|") {
        resultsText = resultsText.substr(0, resultsText.length - 1);
      }
      results.sort = resultsText;
      setGlobalState("results", results);
      if (sortFinishedModalHasBeenShown === false) {
        setGlobalState("triggerSortingFinishedModal", true);
        setGlobalState("sortFinishedModalHasBeenShown", true);
      }
      console.log(resultsText);
    }

    setGlobalState("sortGridResults", sortGridResults);
    localStorage.setItem("sortGridResults", JSON.stringify(sortGridResults));

    // console.log(JSON.stringify(sortGridResults));
  } catch (error) {
    console.error(error);
  }
};

export default calculateDragResults;
