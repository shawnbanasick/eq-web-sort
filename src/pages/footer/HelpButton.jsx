import styled from "styled-components";
import React from "react";
import { view } from "@risingstack/react-easy-state";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const HelpButton = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const currentPage = useStore((state) => state.currentPage);

  let trigger;

  const buttonText = ReactHtmlParser(decodeHTML(langObj.btnHelp)) || "";

  if (currentPage === "landing") {
    trigger = "triggerLandingModal";
  }
  if (currentPage === "presort") {
    trigger = "triggerPresortModal";
  }
  if (currentPage === "sort") {
    trigger = "triggerSortModal";
  }
  if (currentPage === "postsort") {
    trigger = "triggerPostsortModal";
  }
  if (currentPage === "survey") {
    trigger = "triggerSurveyModal";
  }
  if (currentPage === "submit") {
    trigger = "triggerSubmitModal";
  }

  const handleOnClick = () => {
    setGlobalState(trigger, true);
  };

  return (
    <StyledHelpButton tabindex="0" onClick={handleOnClick}>
      {buttonText}
    </StyledHelpButton>
  );
};
export default view(HelpButton);

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
