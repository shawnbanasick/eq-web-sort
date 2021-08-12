import React from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import SurveyTextElement from "./SurveyTextElement";
import SurveyTextAreaElement from "./SurveyTextAreaElement";
import SurveyRadioElement from "./SurveyRadioElement";
import SurveyDropdownElement from "./SurveyDropdownElement";

const SurveyPage = () => {
  const textOptions = {
    qNum: 1,
    type: "text",
    mandatory: true,
    label: "Age*",
    note: "Please enter your year of birth",
    limitLength: true,
    maxLen: 4,
    numsOnly: true,
  };

  const textAreaOptions = {
    qNum: 2,
    type: "textArea",
    mandatory: true,
    label: "Comments",
  };

  const radioOptions = {
    qNum: 3,
    type: "radio",
    mandatory: true,
    label: "Year*",
    note: "Please select your year",
    options: "Freshman; Sophomore; Junior; Senior;",
  };

  const dropdownOptions = {
    qNum: 4,
    type: "select",
    mandatory: true,
    label: "What is your program focus?",
    options: "Global Studies; Linguistics; English Literature",
  };

  setTimeout(function () {
    setGlobalState("currentPage", "survey");
  }, 100);
  console.log(globalState);

  return (
    <Container>
      <h1>Survey Page!</h1>
      <SurveyTextElement opts={textOptions} />
      <SurveyTextAreaElement opts={textAreaOptions} />
      <SurveyRadioElement opts={radioOptions} />
      <SurveyDropdownElement opts={dropdownOptions} />
    </Container>
  );
};

export default view(SurveyPage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
