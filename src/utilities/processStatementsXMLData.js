import shuffle from "lodash/shuffle";

// prep column setup array
const processStatementsXMLData = (dataObject, shuffleCards, vColsObj) => {
  const data = dataObject.statements.statement;
  let statementsArray = [];

  for (let i = 0; i < data.length; i++) {
    let tempObj = {};
    tempObj.id = `s${data[i]._attributes.id}`;
    tempObj.statementNum = data[i]._attributes.id;
    tempObj.divColor = "isUncertainStatement";
    tempObj.cardColor = "yellowSortCard";
    tempObj.pinkChecked = false;
    tempObj.yellowChecked = true;
    tempObj.greenChecked = false;
    tempObj.sortValue = 222;
    tempObj.backgroundColor = "#e0e0e0";
    tempObj.statement = data[i]._text.trim();
    statementsArray.push(tempObj);
  }

  if (shuffleCards === true) {
    const shuffledCards = shuffle(statementsArray);
    statementsArray = [...shuffledCards];
  }

  let totalStatements = statementsArray.length;

  const columnStatements = {};

  columnStatements.vCols = vColsObj;
  columnStatements.statementList = statementsArray;

  localStorage.setItem("hasBeenLoaded", true);
  const returnObj = {};
  returnObj.columnStatements = columnStatements;
  returnObj.totalStatements = totalStatements;
  return returnObj;
};

export default processStatementsXMLData;
