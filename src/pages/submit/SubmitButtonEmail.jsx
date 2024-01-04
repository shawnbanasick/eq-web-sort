import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SubmitSuccessModal from "./SubmitSuccessModal";
import SubmitFailureModal from "./SubmitFailureModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import CopyToClipboardButton from "./CopyToClipboardButton";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDisplaySubmitFallback = (state) => state.displaySubmitFallback;
const getTransmittingData = (state) => state.transmittingData;
const getSetTransmittingData = (state) => state.setTransmittingData;
// const getCheckInternetConnection = (state) => state.checkInternetConnection;
const getSetCheckInternetConnection = (state) =>
  state.setCheckInternetConnection;
const getSetDisableRefreshCheck = (state) => state.setDisableRefreshCheck;

const SubmitResultsButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  let displaySubmitFallback = useStore(getDisplaySubmitFallback);
  let transmittingData = useStore(getTransmittingData);
  const setTransmittingData = useStore(getSetTransmittingData);
  const setCheckInternetConnection = useStore(getSetCheckInternetConnection);
  const setDisableRefreshCheck = useStore(getSetDisableRefreshCheck);
  const [showEmailButtons, setShowEmailButtons] = useState(false);

  const rawData = props.results;
  const emailAddress = configObj.emailAddress;
  const btnTransferText =
    ReactHtmlParser(decodeHTML(langObj.btnTransferEmail)) || "";
  const defaultEmailClientFailText =
    ReactHtmlParser(decodeHTML(langObj.defaultEmailClientFail)) || "";

  const handleClick = (e) => {
    e.preventDefault();
    setTransmittingData(true);
    setCheckInternetConnection(false);

    // create results object for transmission - * is a delimiter
    let formattedResultsTxt = "";
    for (const [key, value] of Object.entries(props.results)) {
      formattedResultsTxt = formattedResultsTxt + `${key}:| ${value} | `;
    }
    console.log("formattedResults: " + formattedResultsTxt);

    // check for internet connection
    setTimeout(() => {
      setTransmittingData(false);
      setCheckInternetConnection(true);
    }, 200);

    console.log(JSON.stringify(formattedResultsTxt, null, 2));

    // Pass to Email client
    if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
      // Do Chrome-related actions  -  %0D%0A is a line break
      window.open(
        `mailto:${configObj.emailAddress}?subject=${configObj.emailSubject}&body=${langObj.emailMessage1} %0D%0A%0D%0AMy Results:%0D%0A${formattedResultsTxt}`
      );
      setShowEmailButtons(true);
    } else {
      // Do non-Chrome-related actions   -  %0D%0A is a line break
      window.location.href = `mailto:${configObj.emailAddress}?subject=${configObj.emailSubject}&body=${langObj.emailMessage1} %0D%0A%0D%0AMy Results:%0D%0A${formattedResultsTxt}`;
      setShowEmailButtons(true);
    }
  };

  // set disable refresh check
  useEffect(() => {
    setDisableRefreshCheck(true);
  }, [setDisableRefreshCheck]);

  console.log("urlUsercode: ", props.results.urlUsercode);

  if (displaySubmitFallback === true) {
    return (
      <React.Fragment>
        <SubmitSuccessModal />

        <DisabledButton tabindex="0">{btnTransferText}</DisabledButton>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <SubmitSuccessModal />
      <SubmitFailureModal />
      <ContainerDiv>
        <StyledButton tabindex="0" onClick={(e) => handleClick(e)}>
          {btnTransferText}
        </StyledButton>

        {transmittingData ? <TransmittingSpin /> : null}
      </ContainerDiv>
      {showEmailButtons ? (
        <EmailButtonDiv>
          <ContentDiv>{defaultEmailClientFailText}</ContentDiv>
          <CopyToClipboardButton
            type={"email"}
            content={emailAddress}
            text={langObj.clipboardEmail}
          />
          <CopyToClipboardButton
            type={"results"}
            content={rawData}
            text={langObj.clipboardResults}
          />
        </EmailButtonDiv>
      ) : (
        <SpacerDiv />
      )}
    </React.Fragment>
  );
};
export default SubmitResultsButton;

const StyledButton = styled.button`
  grid-area: b;
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 400px;
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

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  grid-template-areas: "a b c";
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
  grid-area: c;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 0.7em;

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

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2em;
  width: 65vw;
  font-size: 1.35em;
  margin-top: 25px;
  padding: 5px;
  align-self: center;
`;

const SpacerDiv = styled.div`
  height: 300px;
`;

const EmailButtonDiv = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
