import useStore from "../globalState/useStore";

const processMapXMLData = (dataObject) => {
  const mapObj = {};
  const data = dataObject.map;
  const vColsObj = {};
  const colInfoArray = [];

  // COLUMN LOOP -> get card counts per column
  for (let i = 0; i < data.column.length; i++) {
    let keyVal;
    let label = data.column[i]._attributes.id;
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
    tempObj.colour = `#${data.column[i]._attributes.colour}`;
    tempObj.numCards = data.column[i]._text;
    colInfoArray.push(tempObj);
  }

  // ITEM LOOP -> get color arrays and q sort pattern
  for (let j = 0; j < data.item.length; j++) {
    let splitArray = [];
    let value = data.item[j]._text;
    let key = data.item[j]._attributes.id;
    // numerical array ==> convert to integers
    if (key === "qSortPattern") {
      splitArray = value.split(",").map((x) => +x);
    } else {
      splitArray = value.split(",");
    }
    mapObj[key] = splitArray;
  }

  // create converter object for postsort
  const postsortConvertObj = {};
  const headerNumbers = [...mapObj.qSortHeaders];
  for (let j = 0; j < headerNumbers.length; j++) {
    let key = `column${headerNumbers[j]}`;
    postsortConvertObj[key] = mapObj.qSortHeaderNumbers[j];
  }
  mapObj.postsortConvertObj = postsortConvertObj;

  useStore.setState({ vColsObj: vColsObj });
  const returnObj = {};
  returnObj.vColsObj = vColsObj;
  returnObj.mapObj = mapObj;
  return returnObj;
};

export default processMapXMLData;
