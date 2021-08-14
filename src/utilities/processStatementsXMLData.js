import setGlobalState from "../globalState/setGlobalState";
import getGlobalState from "../globalState/getGlobalState";

// prep column setup array
const processStatementsXMLData = (dataObject) => {
  const data = dataObject.statements.statement;
  const statementsArray = [];

  for (let i = 0; i < data.length; i++) {
    let tempObj = {};
    tempObj.id = `s${data[i]._attributes.id}`;
    tempObj.statementNum = data[i]._attributes.id;
    tempObj.divColor = "";
    tempObj.cardColor = "";
    tempObj.pinkChecked = false;
    tempObj.yellowChecked = false;
    tempObj.greenChecked = false;
    tempObj.sortValue = 0;
    tempObj.statement = data[i]._text.trim();
    statementsArray.push(tempObj);
  }

  const columnStatements = {};
  const vColsObj = getGlobalState("vColsObj");

  columnStatements.vCols = vColsObj;
  columnStatements.statementList = statementsArray;

  setGlobalState("columnStatements", columnStatements);
  localStorage.setItem("columnStatements", JSON.stringify(columnStatements));
};

export default processStatementsXMLData;
