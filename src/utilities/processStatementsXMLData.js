import setGlobalState from "../globalState/setGlobalState";
import getGlobalState from "../globalState/getGlobalState";

// prep column setup array
const processStatementsXMLData = (dataObject) => {
  const data = dataObject.statements.statement;
  const statementsArray = [];
  const hasBeenLoaded = localStorage.getItem("hasBeenLoaded");
  console.log("LOADED: ", hasBeenLoaded);

  if (!hasBeenLoaded) {
    console.log("called!!");
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
      tempObj.statement = data[i]._text.trim();
      statementsArray.push(tempObj);
    }

    const columnStatements = {};
    const vColsObj = getGlobalState("vColsObj");

    columnStatements.vCols = vColsObj;
    columnStatements.statementList = statementsArray;

    setGlobalState("columnStatements", columnStatements);
    localStorage.setItem("columnStatements", JSON.stringify(columnStatements));
    localStorage.setItem("hasBeenLoaded", true);
  }
};

export default processStatementsXMLData;
