import setGlobalState from "../globalState/setGlobalState";

const processStatementsXMLData = (dataObject) => {
  const data = dataObject.statements.statement;
  const statementsArray = [];

  for (let i = 0; i < data.length; i++) {
    let tempObj = {};
    tempObj.stateNum = data[i]._attributes.id;
    tempObj.statement = data[i]._text.trim();
    statementsArray.push(tempObj);
  }

  setGlobalState("statementsArray", statementsArray);
};

export default processStatementsXMLData;
