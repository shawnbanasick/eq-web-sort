import React from "react";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import SurveyTextElement from "./SurveyTextElement";
import SurveyTextAreaElement from "./SurveyTextAreaElement";
import SurveyRadioElement from "./SurveyRadioElement";
import SurveyDropdownElement from "./SurveyDropdownElement";
import SurveyCheckboxElement from "./SurveyCheckboxElement";
import SurveyRating2Element from "./SurveyRating2Element";
import SurveyRating5Element from "./SurveyRating5Element";
import SurveyRating10Element from "./SurveyRating10Element";

const SurveyPage = () => {
  const surveyQuestionObjects = [
    {
      qNum: 1,
      type: "text",
      required: true,
      label: "Age*",
      note: "Please enter your year of birth",
      limitLength: true,
      maxLen: 4,
      numsOnly: true,
    },
    {
      qNum: 2,
      type: "textArea",
      required: true,
      label: "Comments",
    },
    {
      qNum: 3,
      type: "radio",
      required: true,
      label: "Year*",
      note: "Please select your year",
      options: "Freshman; Sophomore; Junior; Senior;",
    },
    {
      qNum: 4,
      type: "select",
      required: true,
      label: "What is your program focus?",
      options: "Global Studies; Linguistics; English Literature",
    },
    {
      qNum: 5,
      type: "checkbox",
      required: true,
      label: "What type of class do you prefer?",
      options: "Lecture; Group Discussion; Active Learning",
    },
    {
      qNum: 6,
      type: "rating2",
      required: true,
      label: "Please answer the following questions",
      scale: "Yes; No",
      options:
        "I have used an iPad in class before.; I have used a notebook computer in class before.",
    },
    {
      qNum: 7,
      type: "rating5",
      required: true,
      label: "Please answer the following questions.",
      options:
        "How would you rate the use of iPads in this class?; How would you rate this class overall",
    },
    {
      qNum: 8,
      type: "rating10",
      required: true,
      label: "Please answer the following questions.",
      options:
        "How would you rate the use of the Socrative website in this class?; How would you rate the use of the Quizlet website in this class?",
    },
  ];

  const SurveyQuestions = () => {
    const QuestionList = surveyQuestionObjects.map((object, index) => {
      if (object.type === "text") {
        return <SurveyTextElement opts={object} />;
      }
      if (object.type === "textArea") {
        return <SurveyTextAreaElement opts={object} />;
      }
      if (object.type === "radio") {
        return <SurveyRadioElement opts={object} />;
      }
      if (object.type === "select") {
        return <SurveyDropdownElement opts={object} />;
      }
      if (object.type === "checkbox") {
        return <SurveyCheckboxElement opts={object} />;
      }
      if (object.type === "rating2") {
        return <SurveyRating2Element opts={object} />;
      }
      if (object.type === "rating5") {
        return <SurveyRating5Element opts={object} />;
      }
      if (object.type === "rating10") {
        return <SurveyRating10Element opts={object} />;
      }
      return null;
    });
    return QuestionList;
  };

  setTimeout(function () {
    setGlobalState("currentPage", "survey");
  }, 100);

  return (
    <Container>
      <h1>Survey Page!</h1>
      <SurveyQuestions />
    </Container>
  );
};

export default view(SurveyPage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 150px;
`;
