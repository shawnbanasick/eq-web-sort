const processConfigXMLData = (dataObject) => {
  //   console.log(JSON.stringify(dataObject, null, 2));
  const data = dataObject.elements[0];
  //   console.log(JSON.stringify(data, null, 2));
  let one = data.elements[1].attributes.id;
  let two = data.elements[1].elements[0].text;
  console.log(one, two);
};

export default processConfigXMLData;
