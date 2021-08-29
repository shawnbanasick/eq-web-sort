// import globalState from "../globalState/globalState";
// import getGlobalState from "../globalState/getGlobalState";
import setGlobalState from "../globalState/setGlobalState";

const processConfigXMLData = (dataObject) => {
  const data = dataObject.elements[0].elements;
  const configObj = {};

  let surveyData = [];
  for (let i = 0; i < data.length; i++) {
    let value;

    let tempObj = data[i];

    let key = data[i].attributes.id;

    // separate out survey questions
    if (key === "survey") {
      surveyData.push([...data[i].elements]);
    }

    let splitArray = [];
    // if it has a value in the XML file ==> no empty strings
    if ("elements" in tempObj) {
      value = data[i].elements[0].text;

      // for all non-survey keys
      if (key !== "survey") {
        // deal with the array values
        if (
          key === "columnHeadersColorsArray" ||
          key === "columnColorsArray" ||
          key === "qSortHeaderNumbers" ||
          key === "qSortHeaders" ||
          key === "qSortPattern"
        ) {
          // numerical array ==> convert to integers
          if (key === "qSortPattern") {
            splitArray = value.split(",").map((x) => +x);
          } else {
            splitArray = value.split(",");
          }
          configObj[key] = splitArray;
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
          configObj[key] = value;
        }
      }
    }
  }

  // create converter object for postsort
  const postsortConvertObj = {};
  const headerNumbers = [...configObj.qSortHeaders];
  for (let j = 0; j < headerNumbers.length; j++) {
    let key = `column${headerNumbers[j]}`;
    postsortConvertObj[key] = configObj.qSortHeaderNumbers[j];
  }

  configObj.postsortConvertObj = postsortConvertObj;

  setGlobalState("configObj", configObj);
  // console.log(JSON.stringify(configObj, null, 2));
  // localStorage.setItem("configObj", JSON.stringify(configObj));

  // setup survey object
  const requiredAnswersObj = {};
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
        tempObj.id = `qNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
        tempObj.qNum = j + 1;
        tempObj.type = "text";
        tempObj.required = isRequired;
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
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
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`qNum${j + 1}`] = "no response";
        }
        tempObj.qNum = j + 1;
        tempObj.type = "rating10";
        tempObj.required = surveyData[j][0].attributes.required;
        tempObj.label = surveyData[j][1].elements[0].text;
        tempObj.options = surveyData[j][0].elements[0].text;
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }
    }
    console.log(JSON.stringify(requiredAnswersObj, null, 2));
    setGlobalState("requiredAnswersObj", requiredAnswersObj);
    setGlobalState("configObj", configObj);
    setGlobalState("surveyQuestionObjArray", surveyQuestionArray);
    // localStorage.setItem(
    //   "surveyQuestionObjArray",
    //   JSON.stringify(surveyQuestionArray)
    // );

    console.log(JSON.stringify(surveyQuestionArray));

    // set default
    // localStorage.setItem("cardHeight", JSON.stringify(120));
    // setGlobalState("cardHeight", 120);
  }
};

export default processConfigXMLData;

// https://stackoverflow.com/questions/7936480/how-to-check-if-a-javascript-object-contains-null-value-or-it-itself-is-null
