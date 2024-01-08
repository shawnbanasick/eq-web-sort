const calculateDragResults = (
  outcome,
  totalStatements,
  results,
  sortFinishedModalHasBeenShown,
  sortGridResults
) => {
  try {
    let isSortingFinished = false;
    let triggerSortingFinishedModal = false;

    if (outcome.destination !== null) {
      // derive sortValue from droppableId
      const replaceColumn = /column/gi;
      const replaceN = /N/gi;
      let sortValue1 = outcome.destination.droppableId;
      sortValue1 = sortValue1.replace(replaceColumn, "");
      sortValue1 = sortValue1.replace(replaceN, "-");
      const sortValue = parseInt(sortValue1, 10);

      // assign key (like "s1") and value (sortValue like "-4")
      sortGridResults[outcome.draggableId] = sortValue;

      // create results string
      const testForCompleteArray = Object.keys(sortGridResults);
      let catchNan = false;

      // test if finished
      if (testForCompleteArray.length === totalStatements) {
        let resultsText = "";
        for (let i = 0; i < totalStatements; i++) {
          let key = `s${i + 1}`;
          let newValue = sortGridResults[key];
          if (isNaN(newValue)) {
            catchNan = true;
          }
          resultsText += `${newValue}|`;
          console.log(resultsText);
        } // loop end

        if (catchNan === true) {
          // card in footer - sort not complete
          isSortingFinished = false;
        } else {
          // if sort is complete
          // process string to remove trailing bar
          isSortingFinished = true;

          if (resultsText.charAt(resultsText.length - 1) === "|") {
            resultsText = resultsText.substring(0, resultsText.length - 1);
          }

          console.log(resultsText);

          results.sort = resultsText;

          if (sortFinishedModalHasBeenShown === false) {
            sortFinishedModalHasBeenShown = true;
            triggerSortingFinishedModal = true;
          }
        }
      }

      const returnObj = {};
      returnObj.isSortingFinished = isSortingFinished;
      returnObj.results = results;
      returnObj.sortFinishedModalHasBeenShown = sortFinishedModalHasBeenShown;
      returnObj.triggerSortingFinishedModal = triggerSortingFinishedModal;
      returnObj.sortGridResults = sortGridResults;

      return returnObj;
    }
  } catch (error) {
    console.error(error);
    console.log("there was an error in calculateDragResults");
  }
};

export default calculateDragResults;
