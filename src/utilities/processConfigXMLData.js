import get from "lodash/get";

const processConfigXMLData = (dataObject) => {
  const data = dataObject.elements[0].elements;
  const configObj = {};
  let surveyQuestionArray;

  let surveyData = [];
  for (let i = 0; i < data.length; i++) {
    let value;

    let tempObj = data[i];

    let key = data[i].attributes.id;

    // separate out survey questions
    if (key === "survey") {
      surveyData.push([...data[i].elements]);
    }

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

  // setup survey object
  const requiredAnswersObj = {};
  if (surveyData.length > 0) {
    surveyQuestionArray = [];
    for (let j = 0; j < surveyData.length; j++) {
      let tempObj = {};
      // let tempObj2 = {};
      let questionType = surveyData[j][0].attributes.type;

      // INFORMATION question
      if (questionType === "information") {
        tempObj.id = `itemNum${j + 1}`;
        tempObj.itemNum = j + 1;
        tempObj.type = "information";
        tempObj.background = surveyData[j][1].attributes.bg;

        try {
          tempObj.options = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }
        requiredAnswersObj[`itemNum${j + 1}`] = "info - n.a.";

        surveyQuestionArray.push(tempObj);
      }

      // TEXT question
      if (questionType === "text") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "text";
        tempObj.required = isRequired;

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          tempObj.note = "";
        }

        try {
          if (surveyData[j][0].attributes.maxlength === undefined) {
            tempObj.limitLength = JSON.parse(
              surveyData[j][0].attributes.limitLength
            );
          } else {
            let oldMaxLength = JSON.parse(
              surveyData[j][0].attributes.maxlength
            );
            tempObj.limitLength = oldMaxLength;
          }
        } catch (error) {
          console.log(error);
          tempObj.limitLength = "999";
        }

        try {
          tempObj.restricted = surveyData[j][0].attributes.restricted;
        } catch (error) {
          console.log(error);
          tempObj.restricted = "false";
        }

        try {
          tempObj.limited = surveyData[j][0].attributes.limited;
        } catch (error) {
          console.log(error);
          tempObj.limited = "false";
        }

        try {
          tempObj.placeholder = surveyData[j][3].elements[0].text;
        } catch (error) {
          tempObj.placeholder = "";
        }
        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // TEXTAREA question
      if (questionType === "textarea") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "textarea";

        try {
          tempObj.required = surveyData[j][0].attributes.required;
        } catch (error) {
          console.log(error);
          tempObj.required = false;
        }

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          tempObj.note = "";
        }

        try {
          tempObj.placeholder = surveyData[j][3].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.placeholder = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RADIO question
      if (questionType === "radio") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "radio";

        try {
          tempObj.required = JSON.parse(surveyData[j][0].attributes.required);
        } catch (error) {
          console.log(error);
          tempObj.required = "false";
        }

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.note = "";
        }

        try {
          tempObj.options = surveyData[j][0].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // SELECT question
      if (questionType === "select") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "select";

        try {
          tempObj.required = surveyData[j][0].attributes.required;
        } catch (error) {
          console.log(error);
          tempObj.required = "false";
        }

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.options = surveyData[j][0].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.note = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // CHECKBOX question
      if (questionType === "checkbox") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "checkbox";
        try {
          tempObj.required = JSON.parse(surveyData[j][0].attributes.required);
        } catch (error) {
          console.log(error);
          tempObj.required = "false";
        }

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.options = surveyData[j][0].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.note = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RATING2 question
      if (questionType === "rating2") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "rating2";
        try {
          tempObj.required = surveyData[j][0].attributes.required;
        } catch (error) {
          console.log(error);
          tempObj.required = "false";
        }

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.scale = surveyData[j][0].attributes.scale;
        } catch (error) {
          console.log(error);
          tempObj.scale = "Yes;;;No";
        }

        try {
          tempObj.options = surveyData[j][0].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.note = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // likert 5 question
      if (questionType === "likert") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "likert";
        try {
          tempObj.required = surveyData[j][0].attributes.required;
        } catch (error) {
          console.log(error);
          tempObj.required = "false";
        }

        try {
          tempObj.label = surveyData[j][1].elements[0]?.text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.scale = surveyData[j][0].attributes.scale;
        } catch (error) {
          console.log(error);
          tempObj.scale =
            "Strongly Disagree;;;Disagree;;;Neutral;;;Agree;;;Strongly Agree";
        }

        try {
          tempObj.options = surveyData[j][0].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RATING5 question
      if (questionType === "rating5") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "rating5";
        try {
          tempObj.required = surveyData[j][0].attributes.required;
        } catch (error) {
          console.log(error);
          tempObj.required = "false";
        }

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.options = surveyData[j][0].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          console.log("rating 5 note error");
          console.log(error);
          tempObj.note = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }

      // RATING10 question
      if (questionType === "rating10") {
        tempObj.id = `itemNum${j + 1}`;
        let isRequired = JSON.parse(surveyData[j][0].attributes.required);
        if (isRequired === "true" || isRequired === true) {
          isRequired = true;
          requiredAnswersObj[`itemNum${j + 1}`] = "no-*?*-response";
        } else {
          requiredAnswersObj[`itemNum${j + 1}`] = "no response";
        }
        tempObj.itemNum = j + 1;
        tempObj.type = "rating10";
        try {
          tempObj.required = surveyData[j][0].attributes.required;
        } catch (error) {
          console.log(error);
          tempObj.required = "false";
        }

        try {
          tempObj.label = surveyData[j][1].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.label = "";
        }

        try {
          tempObj.options = surveyData[j][0].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.options = "";
        }

        try {
          tempObj.note = surveyData[j][2].elements[0].text;
        } catch (error) {
          console.log(error);
          tempObj.note = "";
        }

        tempObj.hasBeenAnswered = false;

        surveyQuestionArray.push(tempObj);
      }
    }

    let resultsSurvey = JSON.parse(localStorage.getItem("resultsSurvey"));
    if (!resultsSurvey) {
      localStorage.setItem("resultsSurvey", JSON.stringify(requiredAnswersObj));
      localStorage.setItem(
        "resultsSurveyArchive",
        JSON.stringify(requiredAnswersObj)
      );
    }

    configObj.requiredAnswersObj = requiredAnswersObj;
  }
  let returnObj = {};
  let shuffleCards = configObj?.shuffleCards;
  returnObj.requiredAnswersObj = requiredAnswersObj;
  returnObj.configObj = configObj;
  returnObj.surveyQuestionObjArray = surveyQuestionArray;
  returnObj.shuffleCards = shuffleCards;
  return returnObj;
};

export default processConfigXMLData;
