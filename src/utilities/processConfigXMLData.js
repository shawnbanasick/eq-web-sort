const processConfigXMLData = (dataObject) => {
  //   console.log(JSON.stringify(dataObject, null, 2));
  const data = dataObject.elements[0].elements;
  console.log(JSON.stringify(data, null, 2));
  console.log(data.length);
  let surveyData;
  for (let i = 0; i < data.length; i++) {
    let two;
    let one = data[i].attributes.id;
    let tempObj = data[i];
    // if ((one = "form")) {
    //   surveyData = [...data[i].elements];
    // }
    if ("elements" in tempObj) {
      two = data[i].elements[0].text;
    } else {
      two = "no data";
    }
    console.log(one, two);
    console.log(i + 1);
  }

  console.log(JSON.stringify(surveyData));
};

export default processConfigXMLData;
