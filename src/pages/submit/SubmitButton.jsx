import React from "react";
import styled from "styled-components";
import SubmitSuccessModal from "./SubmitSuccessModal";
import SubmitFailureModal from "./SubmitFailureModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import PromptUnload from "../../utilities/PromptUnload";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDisplaySubmitFallback = (state) => state.displaySubmitFallback;
const getSubmitFailNumber = (state) => state.submitFailNumber;
const getSetTrigTranFailMod = (state) => state.setTriggerTransmissionFailModal;
const getSetTrigTransOKModal = (state) => state.setTriggerTransmissionOKModal;
const getSetDisplaySubmitFallback = (state) => state.setDisplaySubmitFallback;
const getTransmittingData = (state) => state.transmittingData;
const getSetTransmittingData = (state) => state.setTransmittingData;
const getCheckInternetConnection = (state) => state.checkInternetConnection;
const getSetCheckInternetConnection = (state) =>
  state.setCheckInternetConnection;
const getSetDisplayGoodbyeMessage = (state) => state.setDisplayGoodbyeMessage;

const SubmitResultsButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  let displaySubmitFallback = useStore(getDisplaySubmitFallback);
  let submitFailNumber = useStore(getSubmitFailNumber);
  const setTriggerTransmissionFailModal = useStore(getSetTrigTranFailMod);
  const setTriggerTransmissionOKModal = useStore(getSetTrigTransOKModal);
  const setDisplaySubmitFallback = useStore(getSetDisplaySubmitFallback);
  let transmittingData = useStore(getTransmittingData);
  const setTransmittingData = useStore(getSetTransmittingData);
  let checkInternetConnection = useStore(getCheckInternetConnection);
  const setCheckInternetConnection = useStore(getSetCheckInternetConnection);
  const setDisplayGoodbyeMessage = useStore(getSetDisplayGoodbyeMessage);

  const btnTransferText =
    ReactHtmlParser(decodeHTML(langObj.btnTransfer)) || "";

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;

    // setup for client-side internet connection fail case
    setTransmittingData(true);
    setCheckInternetConnection(false);
    setTimeout(() => {
      setTransmittingData(false);
      setCheckInternetConnection(true);
    }, 20000);

    console.log(JSON.stringify(props.results, null, 2));

    window.firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
        window.rootRef.push(props.results, function (error) {
          if (error) {
            // data error action -  modal
            console.log("data error - there was an error at rootRef level!");
            setTriggerTransmissionFailModal(true);
            e.target.disabled = false;
          } else {
            // do success action - modal
            console.log("success! pushed to database");
            localStorage.setItem("submitted", "true");
            let urlUsercode = localStorage.getItem("urlUsercode");

            if (configObj.linkToSecondProject === true) {
              setDisplayGoodbyeMessage(true);

              const nextLinkAnchor = document.createElement("a");
              nextLinkAnchor.setAttribute("id", "secondProjectLink");
              nextLinkAnchor.setAttribute(
                "href",
                `${configObj.secondProjectUrl}/#/?usercode=${urlUsercode}`
              );
              if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                nextLinkAnchor.setAttribute("target", "_blank");
              }
              document.body.appendChild(nextLinkAnchor);
              document.getElementById("secondProjectLink").click();
            }

            setTriggerTransmissionOKModal(true);
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        submitFailNumber = submitFailNumber + 1;
        console.log(submitFailNumber);
        setTransmittingData(false);
        // Firebase connection error
        console.log("Connection error - there was an error at firebase level!");
        setTriggerTransmissionFailModal(true);
        console.log(errorCode, errorMessage);
        e.target.disabled = false;

        if (submitFailNumber > 2) {
          console.log("display fallback set to true");
          setDisplaySubmitFallback(true);
          displaySubmitFallback = true;
        }
      });
    console.log("submission processed");
  };

  if (displaySubmitFallback === true) {
    return (
      <React.Fragment>
        <PromptUnload />
        <SubmitSuccessModal />
        <SubmitFailureModal />
        <DisabledButton tabindex="0">{btnTransferText}</DisabledButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <PromptUnload />
      <SubmitSuccessModal />
      <SubmitFailureModal />
      {transmittingData ? (
        <TransmittingSpin />
      ) : (
        <StyledButton tabindex="0" onClick={(e) => handleClick(e)}>
          {btnTransferText}
        </StyledButton>
      )}
      {checkInternetConnection && (
        <WarningDiv>Check your internet connection</WarningDiv>
      )}
    </React.Fragment>
  );
};
export default SubmitResultsButton;

const StyledButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: auto;
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

const TransmittingSpin = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #337ab7;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const WarningDiv = styled.div`
  background-color: lightpink;
  padding: 5px;
  border-radius: 3px;
  font-weight: bold;
`;
