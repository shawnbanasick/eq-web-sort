const calculatePostsortResults = (resultsPostsort, mapObj, configObj) => {
  const newObject = {};

  // check for missing responses
  const qSortPattern = mapObj.qSortPattern;
  const qSortHeaderNumbers = mapObj.qSortHeaders;
  const highCardNum = +qSortPattern[qSortPattern.length - 1];
  const highCardVal = +qSortHeaderNumbers[qSortHeaderNumbers.length - 1];
  const highCard2Num = +qSortPattern[qSortPattern.length - 2];
  const highCard2Val = +qSortHeaderNumbers[qSortHeaderNumbers.length - 2];
  const lowCardNum = +qSortPattern[0];
  const lowCardVal = qSortHeaderNumbers[0];
  const lowCard2Num = +qSortPattern[1];
  const lowCard2Val = qSortHeaderNumbers[1];
  const maxValue = Math.max(...qSortPattern);
  const neuCardNum = maxValue;
  const neuCardVal = 0;

  // check for high card answers
  const length = highCardNum;
  for (let i = 0; i < length; i++) {
    if (!resultsPostsort.hasOwnProperty(`column${highCardVal}_${i}`))
      resultsPostsort[`column${highCardVal}_${i}`] = "no response";
  }

  // check for high card 2 answers
  if (configObj.showSecondPosColumn === true) {
    const length2 = highCard2Num;
    for (let ii = 0; ii < length2; ii++) {
      if (!resultsPostsort.hasOwnProperty(`column${highCard2Val}_${ii}`))
        resultsPostsort[`column${highCard2Val}_${ii}`] = "no response";
    }
  }

  // check for neu card answers
  if (configObj.displayNeutralObjects === true) {
    const length5 = neuCardNum;
    for (let jjj = 0; jjj < length5; jjj++) {
      if (!resultsPostsort.hasOwnProperty(`column${neuCardVal}_${jjj}`))
        resultsPostsort[`column${neuCardVal}_${jjj}`] = "no response";
    }
  }

  // check for low card 2 answers
  if (configObj.showSecondNegColumn === true) {
    const length4 = lowCard2Num;
    for (let jj = 0; jj < length4; jj++) {
      if (!resultsPostsort.hasOwnProperty(`column${lowCard2Val}_${jj}`))
        resultsPostsort[`column${lowCard2Val}_${jj}`] = "no response";
    }
  }

  // check for low card answers
  const length3 = lowCardNum;
  for (let j = 0; j < length3; j++) {
    if (!resultsPostsort.hasOwnProperty(`column${lowCardVal}_${j}`))
      resultsPostsort[`column${lowCardVal}_${j}`] = "no response";
  }

  // re-arrange object properties
  let keys = Object.keys(resultsPostsort);
  keys.sort();

  for (let i = 0; i < keys.length; i++) {
    newObject[keys[i]] = resultsPostsort[keys[i]];
  }
  return newObject;
};

export default calculatePostsortResults;
