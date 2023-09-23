const convertObjectToResults = (columnStatements) => {
  let columnSortValues = Object.keys(columnStatements.vCols);

  const sortArray = [];

  // old style loops for speed
  for (let i = 0; i < columnSortValues.length; i++) {
    let tempArray1 = columnStatements.vCols[columnSortValues[i]];

    // convert column key to column sort value
    let sortValue1 = columnSortValues[i];
    const replaceColumn = /column/gi;
    const replaceN = /N/gi;
    sortValue1 = sortValue1.replace(replaceColumn, "");
    sortValue1 = sortValue1.replace(replaceN, "-");
    const sortValue = parseInt(sortValue1, 10);

    // push statement sort values into array
    for (let j = 0; j < tempArray1.length; j++) {
      let tempObject = {};
      tempObject.statement = parseInt(tempArray1[j].statementNum, 10);
      tempObject.sortValue = sortValue;
      sortArray.push(tempObject);
    }
  }

  // sort array by statement
  sortArray.sort((a, b) => {
    return a.statement - b.statement;
  });

  // accumulate text string
  let resultsText = "";
  for (let k = 0; k < sortArray.length; k++) {
    resultsText += `${sortArray[k].sortValue}|`;
  }

  // remove trailing bar
  if (resultsText.charAt(resultsText.length - 1) === "|") {
    resultsText = resultsText.substring(0, resultsText.length - 1);
  }

  return resultsText;
};

export default convertObjectToResults;
