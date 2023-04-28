import React from "react";
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

const SubmitResultsButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const rawData = props.results;

  let displaySubmitFallback = useStore(getDisplaySubmitFallback);
  let transmittingData = useStore(getTransmittingData);
  const setTransmittingData = useStore(getSetTransmittingData);
  // let checkInternetConnection = useStore(getCheckInternetConnection);
  const setCheckInternetConnection = useStore(getSetCheckInternetConnection);

  const btnTransferText = ReactHtmlParser(decodeHTML(langObj.btnTransfer));

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;

    // create results object for transmission
    let formattedResultsTxt = ``;
    for (const [key, value] of Object.entries(rawData)) {
      formattedResultsTxt = formattedResultsTxt + `${key}: ${value} * `;
    }

    setTransmittingData(true);
    setCheckInternetConnection(false);

    setTimeout(() => {
      setTransmittingData(false);
      setCheckInternetConnection(true);
    }, 200);

    // Pass to Email client
    console.log(JSON.stringify(formattedResultsTxt, null, 2));

    window.location.href = `mailto:${configObj.emailAddress}?subject=${configObj.emailSubject}&body=${formattedResultsTxt} `;
  };

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
      {transmittingData ? (
        <TransmittingSpin />
      ) : (
        <StyledButton tabindex="0" onClick={(e) => handleClick(e)}>
          {btnTransferText}
        </StyledButton>
      )}
      <CopyToClipboardButton results={rawData} />
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

/* 
const WarningDiv = styled.div`
  background-color: lightpink;
  padding: 5px;
  border-radius: 3px;
  font-weight: bold;
`;

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
  };
 */
