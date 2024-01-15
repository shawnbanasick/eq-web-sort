import React, { useEffect } from "react";
import styled from "styled-components";
import SubmitSuccessModal from "./SubmitSuccessModal";
import SubmitFailureModal from "./SubmitFailureModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDisplaySubmitFallback = (state) => state.displaySubmitFallback;
const getTransmittingData = (state) => state.transmittingData;
const getSetTransmittingData = (state) => state.setTransmittingData;
const getSetCheckInternetConnection = (state) =>
  state.setCheckInternetConnection;
const getSetDisableRefreshCheck = (state) => state.setDisableRefreshCheck;
const getSetTrigTranFailMod = (state) => state.setTriggerTransmissionFailModal;
const getSetTrigTransOKModal = (state) => state.setTriggerTransmissionOKModal;
const getSetDisplayGoodbyeMessage = (state) => state.setDisplayGoodbyeMessage;

const SubmitResultsButton = (props) => {
  // GLOBAL STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  let displaySubmitFallback = useStore(getDisplaySubmitFallback);
  let transmittingData = useStore(getTransmittingData);
  const setTransmittingData = useStore(getSetTransmittingData);
  const setCheckInternetConnection = useStore(getSetCheckInternetConnection);
  const setDisableRefreshCheck = useStore(getSetDisableRefreshCheck);
  const setTriggerTransmissionFailModal = useStore(getSetTrigTranFailMod);
  const setDisplayGoodbyeMessage = useStore(getSetDisplayGoodbyeMessage);
  const setTriggerTransmissionOKModal = useStore(getSetTrigTransOKModal);

  const btnTransferText =
    ReactHtmlParser(decodeHTML(langObj.btnTransferText)) || "";

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleClick = (e) => {
    // create results object for transmission - * is a delimiter
    e.target.disabled = true;

    let formattedResultsTxt = "";
    for (const [key, value] of Object.entries(props.results)) {
      formattedResultsTxt = formattedResultsTxt + `${key}:| ${value} | `;
    }
    console.log(JSON.stringify(formattedResultsTxt, null, 2));

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        qSortData: formattedResultsTxt,
      }),
    })
      .then(() => {
        // SUCCESS
        console.log("Success!");
        // reset localStorage
        let urlUsercode = localStorage.getItem("urlUsercode");
        localStorage.clear();
        localStorage.setItem("urlUsercode", urlUsercode);
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
      })
      .catch((error) => {
        // ERROR - show modal
        console.log("data error - there was an error at rootRef level!");
        console.log(error);
        setTriggerTransmissionFailModal(true);
        e.target.disabled = false;
      });

    e.preventDefault();

    setTransmittingData(true);
    setCheckInternetConnection(false);
    setTimeout(() => {
      setTransmittingData(false);
      setCheckInternetConnection(true);
    }, 20000);
  }; // end handleClick

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
      <SpacerDiv />
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

const SpacerDiv = styled.div`
  height: 300px;
`;
