import React, { useEffect } from "react";
import styled from "styled-components";
import SurveyTextElement from "./SurveyTextElement";
import SurveyTextAreaElement from "./SurveyTextAreaElement";
import SurveyRadioElement from "./SurveyRadioElement";
import SurveyDropdownElement from "./SurveyDropdownElement";
import SurveyCheckboxElement from "./SurveyCheckboxElement";
import SurveyRating2Element from "./SurveyRating2Element";
import SurveyRating5Element from "./SurveyRating5Element";
import SurveyRating10Element from "./SurveyRating10Element";
import SurveyInformationElement from "./SurveyInformationElement";
import { v4 as uuid } from "uuid";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";
import AnswerAllSurveyQuestionsModal from "./AnswerAllSurveyQuestionsModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import SurveyHelpModal from "./SurveyHelpModal";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import PromptUnload from "../../utilities/PromptUnload";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getSurveyQuestionObjArray = (state) => state.surveyQuestionObjArray;
const getRequiredAnswersObj = (state) => state.requiredAnswersObj;
const getSetRequiredAnswersObj = (state) => state.setRequiredAnswersObj;
const getSetCurrentPage = (state) => state.setCurrentPage;
const getCheckReqQuesComplete = (state) => state.checkRequiredQuestionsComplete;
const getResults = (state) => state.results;
const getSetResults = (state) => state.setResults;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;

const SurveyPage = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const surveyQuestionObjArray = useSettingsStore(getSurveyQuestionObjArray);
  const requiredAnswersObj = useSettingsStore(getRequiredAnswersObj);
  const setRequiredAnswersObj = useSettingsStore(getSetRequiredAnswersObj);
  const setCurrentPage = useStore(getSetCurrentPage);
  const checkRequiredQuestionsComplete = useStore(getCheckReqQuesComplete);
  const results = useStore(getResults);
  const setResults = useStore(getSetResults);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);

  const headerBarColor = configObj.headerBarColor;
  const surveyQuestionObjects = surveyQuestionObjArray;

  // setup language
  const surveyHeader = ReactHtmlParser(decodeHTML(langObj.surveyHeader));

  // set next button display
  setDisplayNextButton(true);

  useEffect(() => {
    // reset required questions if page return
    let keys = Object.keys(requiredAnswersObj);
    for (let i = 0; i < keys.length; i++) {
      requiredAnswersObj[keys[i]] = "no response";
    }
    setRequiredAnswersObj(requiredAnswersObj);
  }, [setRequiredAnswersObj, requiredAnswersObj]);

  useEffect(() => {
    let startTime;
    startTime = Date.now();
    setCurrentPage("survey");

    return () => {
      const updatedResults = calculateTimeOnPage(
        startTime,
        "surveyPage",
        "surveyPage",
        results
      );
      setResults(updatedResults);
    };
  }, [setCurrentPage, results, setResults]);

  const SurveyQuestions = () => {
    if (!surveyQuestionObjects) {
      return <NoQuestionsDiv>No questions added.</NoQuestionsDiv>;
    } else {
      const QuestionList = surveyQuestionObjects.map((object, index) => {
        if (object.type === "text") {
          return (
            <SurveyTextElement
              key={uuid()}
              check={checkRequiredQuestionsComplete}
              opts={object}
            />
          );
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
    }
  };

  return (
    <React.Fragment>
      <PromptUnload />
      <SurveyHelpModal />
      <AnswerAllSurveyQuestionsModal />
      <SortTitleBar background={headerBarColor}>{surveyHeader}</SortTitleBar>
      <Container>
        <SurveyQuestions />
      </Container>
    </React.Fragment>
  );
};

export default SurveyPage;

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
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 28px;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

const NoQuestionsDiv = styled.div`
  margin-top: 50px;
  font-size: 24px;
  font-weight: bold;
`;
