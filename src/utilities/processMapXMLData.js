import setGlobalState from "../globalState/setGlobalState";
import getGlobalState from "../globalState/getGlobalState";

const processMapXMLData = (dataObject) => {
  // const configObj = getGlobalState("configObj");
  let mapObj = {};
  const data = dataObject.map.column;
  console.log("data: ", data);
  const vColsObj = {};
  const colInfoArray = [];
  for (let i = 0; i < data.length; i++) {
    let keyVal;
    let label = data[i]._attributes.id;

    let splitArray = [];
    let value = data[i].elements[0].text;

    if (
      label === "columnHeadersColorsArray" ||
      label === "columnColorsArray" ||
      label === "qSortHeaderNumbers" ||
      label === "qSortHeaders" ||
      label === "qSortPattern"
    ) {
      // numerical array ==> convert to integers
      if (label === "qSortPattern") {
        splitArray = value.split(",").map((x) => +x);
      } else {
        splitArray = value.split(",");
      }
      mapObj[label] = splitArray;
    } else {
      // for all others...
      // convert string values -  boolean or number
      if (value === "true") {
        value = true;
      } else if (value === "false") {
        value = false;
      } else if (!isNaN(value)) {
        value = +value;
      }
      mapObj[label] = value;
    }

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

  // create converter object for postsort
  const postsortConvertObj = {};
  const headerNumbers = [...mapObj.qSortHeaders];
  for (let j = 0; j < headerNumbers.length; j++) {
    let key = `column${headerNumbers[j]}`;
    postsortConvertObj[key] = mapObj.qSortHeaderNumbers[j];
  }

  mapObj.postsortConvertObj = postsortConvertObj;

  setGlobalState("colInfoArray", colInfoArray);
  setGlobalState("vColsObj", vColsObj);
  setGlobalState("mapObj", mapObj);
};

export default processMapXMLData;
