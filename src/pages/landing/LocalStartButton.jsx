import styled from "styled-components";
import React, { useEffect, useCallback } from "react";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import { withRouter } from "react-router";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;
const getLocalParticipantName = (state) => state.localParticipantName;
const getLocalUsercode = (state) => state.localUsercode;
const getSetLocalParticipantName = (state) => state.setLocalParticipantName;
const getSetLocalUsercode = (state) => state.setLocalUsercode;
const getSetLocalPartIdWarning1 = (state) => state.setLocalPartIdWarning1;
const getSetLocalPartIdWarning2 = (state) => state.setLocalPartIdWarning2;
const getSetTriggerLocalSubmitSuccessModal = (state) =>
  state.setTriggerLocalSubmitSuccessModal;
const getSetResults = (state) => state.setResults;
const getResults = (state) => state.results;

const LogInSubmitButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const localParticipantName = useStore(getLocalParticipantName);
  const localUsercode = useStore(getLocalUsercode);
  const setLocalParticipantName = useStore(getSetLocalParticipantName);
  const setLocalUsercode = useStore(getSetLocalUsercode);
  let setLocalPartIdWarning1 = useStore(getSetLocalPartIdWarning1);
  let setLocalPartIdWarning2 = useStore(getSetLocalPartIdWarning2);
  const setTriggerLocalSubmitSuccessModal = useStore(
    getSetTriggerLocalSubmitSuccessModal
  );
  const setResults = useStore(getSetResults);
  const results = useStore(getResults);

  const localStartButtonText =
    ReactHtmlParser(decodeHTML(langObj.localStartButtonText)) || "";

  const checkForNextPageConditions = useCallback(() => {
    let value0 = false;
    let value1;
    let value2;

    if (localParticipantName.length === 0) {
      value1 = false;
      setLocalPartIdWarning1(true);
    } else {
      setLocalPartIdWarning1(false);
      value1 = true;
    }

    if (localUsercode.length === 0) {
      value2 = false;
      setLocalPartIdWarning2(true);
    } else {
      setLocalPartIdWarning2(false);

      value2 = true;
    }

    if (value1 === true && value2 === true) {
      value0 = true;
    } else {
      value0 = false;
    }

    return value0;
  }, [
    setLocalPartIdWarning1,
    setLocalPartIdWarning2,
    localParticipantName,
    localUsercode,
  ]);

  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;

  useEffect(() => {
    const handleKeyUpStart = (event) => {
      // reset time stamp
      setResults(results);

      if (event.key === "Enter") {
        let isInputComplete = checkForNextPageConditions();
        if (isInputComplete) {
          history.push(`/presort`);
        }
      }
    }; // end keyup

    window.addEventListener("keyup", handleKeyUpStart);

    return () => window.removeEventListener("keyup", handleKeyUpStart);
  }, [history, checkForNextPageConditions, results, setResults]);

  useEffect(() => {
    setLocalParticipantName("");
    setLocalUsercode("");
    setLocalPartIdWarning1(false);
    setLocalPartIdWarning2(false);
  }, [
    setLocalPartIdWarning1,
    setLocalPartIdWarning2,
    setLocalParticipantName,
    setLocalUsercode,
  ]);

  return (
    <StyledSubmitButton
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event);
        let isInputComplete = checkForNextPageConditions();
        if (isInputComplete) {
          history.push(to);
        }
        setTriggerLocalSubmitSuccessModal(false);
      }}
      tabindex="3"
    >
      {localStartButtonText}
    </StyledSubmitButton>
  );
};
export default withRouter(LogInSubmitButton);

const StyledSubmitButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: auto;
  height: 50px;
  justify-self: right;
  align-self: end;
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
