// import globalState from "../globalState/globalState";
import setGlobalState from "../globalState/setGlobalState";

const processConfigXMLData = (dataObject) => {
  const data = dataObject.elements[0].elements;
  //   console.log(JSON.stringify(data, null, 2));
  console.log(data.length);
  let surveyData = [];
  for (let i = 0; i < data.length; i++) {
    let value;
    let key = data[i].attributes.id;
    let tempObj = data[i];
    if (key === "survey") {
      surveyData.push([...data[i].elements]);
    }
    if ("elements" in tempObj) {
      value = data[i].elements[0].text;
      if (key !== "survey") {
        setGlobalState(key, value);
      }
    }
  }
  //   console.log(JSON.stringify(globalState, null, 2));
  console.log(JSON.stringify(surveyData, null, 2));

  console.log(JSON.stringify(surveyData[3], null, 2));

  const surveyQuestionArray = [];
  for (let j = 0; j < surveyData.length; j++) {
    let tempObj = {};
    let questionType = surveyData[j][0].attributes.type;

    // INFORMATION question
    if (questionType === "information") {
      tempObj.qNum = j + 1;
      tempObj.type = "information";
      tempObj.background = surveyData[j][1].attributes.bg;
      tempObj.options = surveyData[j][1].elements[0].text;

      surveyQuestionArray.push(tempObj);
    }

    // TEXT question
    if (questionType === "text") {
      tempObj.qNum = j + 1;
      tempObj.type = "text";
      tempObj.required = surveyData[j][0].attributes.required;
      tempObj.label = surveyData[j][1].elements[0].text;
      tempObj.note = surveyData[j][2].elements[0].text;
      tempObj.limitLength = surveyData[j][0].attributes.maxlength;
      tempObj.restricted = surveyData[j][0].attributes.restricted;

      surveyQuestionArray.push(tempObj);
    }

    // TEXTAREA question
    if (questionType === "textarea") {
      tempObj.qNum = j + 1;
      tempObj.type = "textarea";
      tempObj.required = surveyData[j][0].attributes.required;
      tempObj.label = surveyData[j][1].elements[0].text;

      surveyQuestionArray.push(tempObj);
    }

    // RADIO question
    if (questionType === "radio") {
      tempObj.qNum = j + 1;
      tempObj.type = "radio";
      tempObj.required = surveyData[j][0].attributes.required;
      tempObj.label = surveyData[j][1].elements[0].text;
      tempObj.note = surveyData[j][2].elements[0].text;
      tempObj.options = surveyData[j][0].elements[0].text;

      surveyQuestionArray.push(tempObj);
    }
  }
  console.log(JSON.stringify(surveyQuestionArray));
};

export default processConfigXMLData;
