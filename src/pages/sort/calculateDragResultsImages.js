const calculateDragResultsImages = (
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

      // *** IF SORTING FINISHED
      if (testForCompleteArray.length === totalStatements) {
        // convert to results text
        let resultsText = "";
        for (let i = 0; i < totalStatements; i++) {
          let key = `image${i + 1}`;
          let newValue = sortGridResults[key];
          if (isNaN(newValue)) {
            catchNan = true;
          }
          resultsText += `${newValue}|`;
        } // loop end

        if (catchNan === true) {
          // card in footer - sort not complete
          isSortingFinished = false;
        } else {
          // if sort is complete
          // process string to remove trailing bar
          isSortingFinished = true;
          // remove trailing bar
          if (resultsText.charAt(resultsText.length - 1) === "|") {
            resultsText = resultsText.substring(0, resultsText.length - 1);
          }

          results.sort = resultsText;
          console.log("resultsText", resultsText);

          localStorage.setItem("resultsSort", JSON.stringify(resultsText));

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

export default calculateDragResultsImages;
