import React, { useEffect } from "react";
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
import SurveyTextRestrictedElement from "./SurveyTextRestrictedElement";
import SurveyInformationElement from "./SurveyInformationElement";
import { v4 as uuid } from "uuid";
import getGlobalState from "../../globalState/getGlobalState";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";

const SurveyPage = () => {
  const langObj = getGlobalState("langObj");
  const configObj = getGlobalState("configObj");
  const headerBarColor = configObj.headerBarColor;
  const surveyQuestionObjects = getGlobalState("surveyQuestionObjArray");

  useEffect(() => {
    let startTime;
    startTime = Date.now();
    return () => {
      calculateTimeOnPage(startTime, "surveyPage", "surveyPage");
    };
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setGlobalState("currentPage", "survey");
    }, 100);
  }, []);

  const SurveyQuestions = () => {
    const QuestionList = surveyQuestionObjects.map((object, index) => {
      if (object.type === "text") {
        return <SurveyTextElement key={uuid()} opts={object} />;
      }
      if (object.type === "textRestricted") {
        return <SurveyTextRestrictedElement key={uuid()} opts={object} />;
      }
      if (object.type === "textarea") {
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
    <React.Fragment>
      <SortTitleBar background={headerBarColor}>
        {langObj.postsortTitle}
      </SortTitleBar>
      <Container>
        <SurveyQuestions />
      </Container>
    </React.Fragment>
  );
};

export default view(SurveyPage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 150px;
  margin-top: 50px;
`;

const SortTitleBar = styled.div`
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  padding-top: 5px;
  min-height: 50px;
  background-color: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
`;
