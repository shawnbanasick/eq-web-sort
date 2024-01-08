import React from "react";
import styled from "styled-components";
import SubmitSuccessModal from "./SubmitSuccessModal";
import SubmitFailureModal from "./SubmitFailureModal";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import { v4 as uuid } from "uuid";
import useSettingsStore from "../../globalState/useSettingsStore";
import useLocalPersist from "../../globalState/useLocalPersist";
import useStore from "../../globalState/useStore";

const getSetLocalStoredQsorts = (state) => state.setLocalStoredQsorts;
const getLocalStoredQsorts = (state) => state.localStoredQsorts;
const getSetHasDownloadedQsorts = (state) => state.setHasDownloadedQsorts;
const getSetTriggerLocalSubmitSuccessModal = (state) =>
  state.setTriggerLocalSubmitSuccessModal;

const getLangObj = (state) => state.langObj;

const SubmitLocalResultsButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const setLocalStoredQsorts = useLocalPersist(getSetLocalStoredQsorts);
  let localStoredQsorts = useLocalPersist(getLocalStoredQsorts);
  const setHasDownloadedQsorts = useLocalPersist(getSetHasDownloadedQsorts);
  const setTriggerLocalSubmitSuccessModal = useStore(
    getSetTriggerLocalSubmitSuccessModal
  );

  const btnTransferText =
    ReactHtmlParser(decodeHTML(langObj.localSaveDataButton)) || "";

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;

    try {
      console.log(JSON.stringify(props.results, null, 2));

      const participantDesignation1 = uuid();
      const participantDesignation = participantDesignation1.substring(0, 8);

      localStoredQsorts[participantDesignation] = props.results;
      setLocalStoredQsorts(localStoredQsorts);

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

      setTriggerLocalSubmitSuccessModal(true);
      setHasDownloadedQsorts(false);
    } catch (error) {
      e.target.disabled = false;
    }
  };

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
export default SubmitLocalResultsButton;

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
