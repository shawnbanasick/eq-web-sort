import styled from "styled-components";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getCurrentPage = (state) => state.currentPage;
const getSetTriggerLandingModal = (state) => state.setTriggerLandingModal;
const getSetTriggerPresortModal = (state) => state.setTriggerPresortModal;
const getSetTriggerSortModal = (state) => state.setTriggerSortModal;
const getSetTriggerPostsortModal = (state) => state.setTriggerPostsortModal;
const getSetTriggerSurveyModal = (state) => state.setTriggerSurveyModal;
const getSetTriggerSubmitModal = (state) => state.setTriggerSubmitModal;
const getSetTriggerConsentModal = (state) => state.setTriggerConsentModal;

const HelpButton = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const currentPage = useStore(getCurrentPage);
  const setTriggerLandingModal = useStore(getSetTriggerLandingModal);
  const setTriggerPresortModal = useStore(getSetTriggerPresortModal);
  const setTriggerSortModal = useStore(getSetTriggerSortModal);
  const setTriggerPostsortModal = useStore(getSetTriggerPostsortModal);
  const setTriggerSurveyModal = useStore(getSetTriggerSurveyModal);
  const setTriggerSubmitModal = useStore(getSetTriggerSubmitModal);
  const setTriggerConsentModal = useStore(getSetTriggerConsentModal);

  let buttonText = ReactHtmlParser(decodeHTML(langObj.btnHelp)) || "";
  if (currentPage === "landing") {
    buttonText = ReactHtmlParser(decodeHTML(langObj.btnHelpLanding)) || "";
  }
  if (currentPage === "consent") {
    buttonText = ReactHtmlParser(decodeHTML(langObj.btnHelpConsent)) || "";
  }

  const handleOnClick = () => {
    console.log("currentPage", currentPage);
    if (currentPage === "landing") {
      setTriggerLandingModal(true);
    }
    if (currentPage === "consent") {
      setTriggerConsentModal(true);
    }
    if (currentPage === "presort") {
      setTriggerPresortModal(true);
    }
    if (currentPage === "sort") {
      setTriggerSortModal(true);
    }
    if (currentPage === "postsort") {
      setTriggerPostsortModal(true);
    }
    if (currentPage === "survey") {
      setTriggerSurveyModal(true);
    }
    if (currentPage === "submit") {
      setTriggerSubmitModal(true);
    }
  };

  if (currentPage === "consent") {
    if (configObj.showConsentPageHelpModal === true) {
      return (
        <StyledHelpButton tabindex="0" onClick={handleOnClick}>
          {buttonText}
        </StyledHelpButton>
      );
    } else {
      return null;
    }
  }

  return (
    <StyledHelpButton tabindex="0" onClick={handleOnClick}>
      {buttonText}
    </StyledHelpButton>
  );
};
export default HelpButton;

const StyledHelpButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.5em;
  border-radius: 3px;
  text-decoration: none;
  width: auto;
  justify-self: right;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;

/*

  &:hover {
    opacity: 1;
    box-shadow: inset 0 0 0 4px #666, 0 0 1px transparent;
  }
  */
