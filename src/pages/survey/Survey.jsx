import React, { useEffect } from "react";
import setGlobalState from "../../globalState/setGlobalState";
// import getGlobalState from "../../globalState/getGlobalState";
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
import SurveyTextRestrictedElement from "./SurveyTextRestrictedElement";
import SurveyInformationElement from "./SurveyInformationElement";
import { v4 as uuid } from "uuid";

const langObj = JSON.parse(localStorage.getItem("langObj"));

const SurveyPage = () => {
  let surveyQuestionObjects;
  useEffect(() => {
    setTimeout(function () {
      setGlobalState("currentPage", "survey");
    }, 100);
  }, []);

  surveyQuestionObjects = JSON.parse(
    localStorage.getItem("surveyQuestionObjArray")
  );

  const SurveyQuestions = () => {
    const QuestionList = surveyQuestionObjects.map((object, index) => {
      if (object.type === "text") {
        return <SurveyTextElement key={uuid()} opts={object} />;
      }
      if (object.type === "textRestricted") {
        return <SurveyTextRestrictedElement key={uuid()} opts={object} />;
      }
      if (object.type === "textArea") {
        return <SurveyTextAreaElement key={uuid()} opts={object} />;
      }
      if (object.type === "radio") {
        return <SurveyRadioElement key={uuid()} opts={object} />;
      }
      if (object.type === "select") {
        return <SurveyDropdownElement key={uuid()} opts={object} />;
      }
      if (object.type === "checkbox") {
        return <SurveyCheckboxElement key={uuid()} opts={object} />;
      }
      if (object.type === "rating2") {
        return <SurveyRating2Element key={uuid()} opts={object} />;
      }
      if (object.type === "rating5") {
        return <SurveyRating5Element key={uuid()} opts={object} />;
      }
      if (object.type === "rating10") {
        return <SurveyRating10Element key={uuid()} opts={object} />;
      }
      if (object.type === "information") {
        return <SurveyInformationElement key={uuid()} opts={object} />;
      }
      return null;
    });
    return QuestionList;
  };

  return (
    <Container>
      <h1>{langObj.postsortTitle}</h1>
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
