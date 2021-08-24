// import globalState from "../globalState/globalState";
import setGlobalState from "../globalState/setGlobalState";

const processConfigXMLData = (dataObject) => {
  const data = dataObject.elements[0].elements;
  const configObj = {};

  let surveyData = [];
  for (let i = 0; i < data.length; i++) {
    let value;
    let key = data[i].attributes.id;
    let tempObj = data[i];

    // get survey questions
    if (key === "survey") {
      surveyData.push([...data[i].elements]);
    }

    // check if value in key-value pair
    if ("elements" in tempObj) {
      value = data[i].elements[0].text;
      if (key !== "survey") {
        configObj[key] = value;

        // todo remove this one
        setGlobalState(key, value);
      }
    }
  }
  setGlobalState("configObj", configObj);
  localStorage.setItem("configObj", JSON.stringify(configObj));

  // setup survey object
  if (surveyData.length > 0) {
    const surveyQuestionArray = [];
    for (let j = 0; j < surveyData.length; j++) {
      let tempObj = {};
      // let tempObj2 = {};
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
        tempObj.required = JSON.parse(surveyData[j][0].attributes.required);
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.note = surveyData[j][2].elements[0].text;
        tempObj.limitLength = JSON.parse(surveyData[j][0].attributes.maxlength);
        tempObj.restricted = surveyData[j][0].attributes.restricted;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // TEXT question
      if (questionType === "textRestricted") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "textRestricted";
        tempObj.required = surveyData[j][0].attributes.required;
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.note = surveyData[j][2].elements[0].text;
        tempObj.limitLength = surveyData[j][0].attributes.maxlength;
        tempObj.restricted = surveyData[j][0].attributes.restricted;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // TEXTAREA question
      if (questionType === "textarea") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "textarea";
        tempObj.required = surveyData[j][0].attributes.required;
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RADIO question
      if (questionType === "radio") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "radio";
        tempObj.required = JSON.parse(surveyData[j][0].attributes.required);
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.note = surveyData[j][2].elements[0].text;
        tempObj.options = surveyData[j][0].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // SELECT question
      if (questionType === "select") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "select";
        tempObj.required = surveyData[j][0].attributes.required;
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.options = surveyData[j][0].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // CHECKBOX question
      if (questionType === "checkbox") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "checkbox";
        tempObj.required = JSON.parse(surveyData[j][0].attributes.required);
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.options = surveyData[j][0].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RATING2 question
      if (questionType === "rating2") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "rating2";
        tempObj.required = surveyData[j][0].attributes.required;
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.scale = surveyData[j][0].attributes.scale;
        tempObj.options = surveyData[j][0].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RATING5 question
      if (questionType === "rating5") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "rating5";
        tempObj.required = surveyData[j][0].attributes.required;
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.options = surveyData[j][0].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RATING10 question
      if (questionType === "rating10") {
        tempObj.id = `qNum${j + 1}`;
        tempObj.qNum = j + 1;
        tempObj.type = "rating10";
        tempObj.required = surveyData[j][0].attributes.required;
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.options = surveyData[j][0].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }
    }
    setGlobalState("surveyQuestionObjArray", surveyQuestionArray);
    localStorage.setItem(
      "surveyQuestionObjArray",
      JSON.stringify(surveyQuestionArray)
    );
    // set default
    localStorage.setItem("cardHeight", JSON.stringify(120));
  }
};

export default processConfigXMLData;
