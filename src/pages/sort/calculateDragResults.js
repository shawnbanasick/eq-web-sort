import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const calculateDragResults = (result, totalStatements) => {
  try {
    if (result.destination !== null) {
      // STATE

      const results = getGlobalState("results");
      const sortFinishedModalHasBeenShown = getGlobalState(
        "sortFinishedModalHasBeenShown"
      );

      // const totalStatements = configObj.totalStatements;
      const sortGridResults = getGlobalState("sortGridResults");

      // derive sortValue from droppableId
      const replaceColumn = /column/gi;
      const replaceN = /N/gi;
      let sortValue1 = result.destination.droppableId;
      sortValue1 = sortValue1.replace(replaceColumn, "");
      sortValue1 = sortValue1.replace(replaceN, "-");
      const sortValue = parseInt(sortValue1, 10);

      // assign key (like "s1") and value (sortValue like "-4")
      sortGridResults[result.draggableId] = sortValue;

      // create results string
      const testForCompleteArray = Object.keys(sortGridResults);
      let catchNan = false;
      if (testForCompleteArray.length === totalStatements) {
        let resultsText = "";
        for (let i = 0; i < totalStatements; i++) {
          let key = `s${i + 1}`;
          let newValue = sortGridResults[key];
          if (isNaN(newValue)) {
            catchNan = true;
          }
          resultsText += `${newValue}|`;
        } // loop end

        if (catchNan === true) {
          // card in footer - sort not complete
          setGlobalState("sortFinished", false);
        } else {
          // if sort is complete
          // process string to remove trailing bar
          setGlobalState("sortFinished", true);

          if (resultsText.charAt(resultsText.length - 1) === "|") {
            resultsText = resultsText.substr(0, resultsText.length - 1);
          }

          console.log(resultsText);

          results.sort = resultsText;
          setGlobalState("results", results);
          if (sortFinishedModalHasBeenShown === false) {
            setGlobalState("sortFinishedModalHasBeenShown", true);
            setGlobalState("triggerSortingFinishedModal", true);
          }
        }
      }
      setGlobalState("sortGridResults", sortGridResults);
    }
  } catch (error) {
    console.error(error);
    console.log("there was an error in calculateDragResults");
  }
};

export default calculateDragResults;
