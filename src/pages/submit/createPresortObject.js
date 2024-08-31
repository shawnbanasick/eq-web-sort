const createPresortObject = () => {
  try {
    const resultsPresort = JSON.parse(localStorage.getItem("resultsPresort"));
    const presortObject = {};
    let numPos = resultsPresort?.npos;
    if (isNaN(numPos)) {
      numPos = 0;
    }
    let numNeu = resultsPresort?.nneu;
    if (isNaN(numNeu)) {
      numNeu = 0;
    }
    let numNeg = resultsPresort?.nneg;
    if (isNaN(numNeg)) {
      numNeg = 0;
    }
    presortObject["npos"] = numPos;
    presortObject["posStateNums"] = resultsPresort?.posStateNums || [];
    presortObject["nneu"] = numNeu;
    presortObject["neuStateNums"] = resultsPresort?.neuStateNums || [];
    presortObject["nneg"] = numNeg;
    presortObject["negStateNums"] = resultsPresort?.negStateNums || [];
    return presortObject;
  } catch (error) {
    console.log(error);
    return;
  }
};

export default createPresortObject;
