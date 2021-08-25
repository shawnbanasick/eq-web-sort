import setGlobalState from "../globalState/setGlobalState";

const processMapXMLData = (dataObject) => {
  const data = dataObject.map.column;
  const vColsObj = {};
  const colInfoArray = [];
  for (let i = 0; i < data.length; i++) {
    let keyVal;
    let label = data[i]._attributes.id;
    let labelInt = parseInt(label, 10);
    if (labelInt < 0) {
      keyVal = `columnN${Math.abs(labelInt)}`;
      vColsObj[keyVal] = [];
    } else {
      keyVal = `column${labelInt}`;
      vColsObj[keyVal] = [];
    }

    let tempObj = {};
    tempObj.colNum = i + 1;
    tempObj.label = label;
    tempObj.colour = `#${data[i]._attributes.colour}`;
    tempObj.numCards = data[i]._text;
    colInfoArray.push(tempObj);
  }
  setGlobalState("colInfoArray", colInfoArray);
  setGlobalState("vColsObj", vColsObj);
  // console.log("infoArray: ", JSON.stringify(colInfoArray));
  // console.log("vColsObj: ", JSON.stringify(vColsObj));
};

export default processMapXMLData;
