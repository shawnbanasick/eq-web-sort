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
  const langObj = getGlobalState("langObj");
  const displaySubmitFallback = getGlobalState("displaySubmitFallback");
  const btnTransferText = ReactHtmlParser(decodeHTML(langObj.btnTransfer));

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    console.log(JSON.stringify(props.results, null, 2));

    window.firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        window.rootRef.push(props.results, function (error) {
          if (error) {
            // error action -  modal
            console.log("there was an error at rootRef level!");
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
        // ...
        console.log("there was an error at firebase level!");
        setGlobalState("triggerTransmissionFailModal", true);
        console.log(errorCode, errorMessage);
        e.target.disabled = false;
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
