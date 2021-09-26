import React from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SubmitSuccessModal from "./SubmitSuccessModal";
import SubmitFailureModal from "./SubmitFailureModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const SubmitResultsButton = (props) => {
  var rootRef = window.firebase.database().ref();

  const langObj = getGlobalState("langObj");
  let displaySubmitFallback = getGlobalState("displaySubmitFallback");
  const btnTransferText = ReactHtmlParser(decodeHTML(langObj.btnTransfer));
  let submitFailNumber = getGlobalState("submitFailNumber");
  /* 
  const demoData = {
    projectName: "My_Q_project",
    partId: "jimbo-wilbur",
    randomId: "8ea8f130-b1e",
    dateTime: "26/9/2021 @ 7:28:33",
    timeLanding: "00:02:15",
    timePresort: "00:05:06",
    timeSort: "00:06:28",
    timePostsort: "00:01:01",
    timeSurvey: "00:01:36",
    npos: 3,
    nneu: 27,
    nneg: 3,
    column4_1: "no response",
    column4_2: "no response",
    columnN4_1: "no response",
    columnN4_2: "no response",
    qNum1: "info. - na",
    qNum2: "hjkhjkhk",
    qNum3: "no response",
    qNum4: "no response",
    qNum5: "no response",
    qNum6: "no response",
    qNum7: "1",
    "qNum8-1": "no response",
    "qNum8-2": "no response",
    "qNum8-3": "no response",
    "qNum8-4": "no response",
    "qNum9-1": "no response",
    "qNum9-2": "no response",
    "qNum9-3": "no response",
    "qNum9-4": "no response",
    "qNum10-1": "no response",
    "qNum10-2": "no response",
    "qNum10-3": "no response",
    "qNum10-4": "no response",
    sort: "1|0|-1|0|-1|-2|0|-1|3|-2|-3|3|1|-4|-4|1|2|2|2|3|1|2|4|-3|4|-2|-1|0|-2|-1|1|0|-3",
  }; */

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    console.log(JSON.stringify(props.results, null, 2));

    window.firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        // rootRef.push(demoData, function (error) {
        rootRef.push(props.results, function (error) {
          if (error) {
            // data error action -  modal
            console.log("data error - there was an error at rootRef level!");
            setGlobalState("triggerTransmissionFailModal", true);
            e.target.disabled = false;
          } else {
            // do success action - modal
            setGlobalState("triggerTransmissionOKModal", true);
            console.log("success! pushed to database");
            localStorage.removeItem("cumulativelandingPageDuration");
            localStorage.removeItem("cumulativepresortPageDuration");
            localStorage.removeItem("cumulativesortPageDuration");
            localStorage.removeItem("cumulativepostsortPageDuration");
            localStorage.removeItem("cumulativesurveyPageDuration");
            localStorage.removeItem("lastAccesslandingPage");
            localStorage.removeItem("lastAccesspresortPage");
            localStorage.removeItem("lastAccesssortPage");
            localStorage.removeItem("lastAccesspostsortPage");
            localStorage.removeItem("lastAccesssurveyPage");
            localStorage.removeItem("timeOnlandingPage");
            localStorage.removeItem("timeOnpresortPage");
            localStorage.removeItem("timeOnsortPage");
            localStorage.removeItem("timeOnpostsortPage");
            localStorage.removeItem("timeOnsurveyPage");
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        submitFailNumber = submitFailNumber + 1;
        console.log(submitFailNumber);
        // Firebase connection error
        console.log("Connection error - there was an error at firebase level!");
        setGlobalState("triggerTransmissionFailModal", true);
        console.log(errorCode, errorMessage);
        e.target.disabled = false;

        if (submitFailNumber > 2) {
          console.log("display fallback set to true");
          setGlobalState("displaySubmitFallback", true);
          displaySubmitFallback = true;
        }
      });
    console.log("submission processed");
  };

  if (displaySubmitFallback === true) {
    return (
      <React.Fragment>
        <SubmitSuccessModal />
        <SubmitFailureModal />
        <DisabledButton tabindex="0">{btnTransferText}</DisabledButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <SubmitSuccessModal />
      <SubmitFailureModal />
      <StyledButton tabindex="0" onClick={(e) => handleClick(e)}>
        {btnTransferText}
      </StyledButton>
    </React.Fragment>
  );
};
export default view(SubmitResultsButton);

const StyledButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 200px;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;

const DisabledButton = styled.button`
  border-color: lightgray;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 200px;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: lightgray;
`;
