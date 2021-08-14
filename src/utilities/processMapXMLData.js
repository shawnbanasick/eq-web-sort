const processMapXMLData = (dataObject) => {
  //   console.log(JSON.stringify(dataObject, null, 2));

  const data = dataObject.map.column;
  //   console.log(JSON.stringify(data, null, 2));

  const colInfoArray = [];
  for (let i = 0; i < data.length; i++) {
    let tempObj = {};
    tempObj.colNum = i + 1;
    tempObj.label = data[i]._attributes.id;
    tempObj.colour = `#${data[i]._attributes.colour}`;
    tempObj.numCards = data[i]._text;
    colInfoArray.push(tempObj);
  }
  //   console.log(JSON.stringify(colInfoArray, null, 2));
};

export default processMapXMLData;
