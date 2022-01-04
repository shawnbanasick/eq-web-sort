import styled from "styled-components";
import React, { useEffect, useCallback } from "react";
import { view } from "@risingstack/react-easy-state";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import { withRouter } from "react-router";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";

const LogInSubmitButton = (props) => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const localParticipantName = useStore((state) => state.localParticipantName);
  const localUsercode = useStore((state) => state.localUsercode);

  const setLocalParticipantName = useStore(
    (state) => state.setLocalParticipantName
  );
  const setLocalUsercode = useStore((state) => state.setLocalUsercode);

  let setLocalPartIdWarning1 = useStore(
    (state) => state.setLocalPartIdWarning1
  );

  let setLocalPartIdWarning2 = useStore(
    (state) => state.setLocalPartIdWarning2
  );

  const localStartButtonText = ReactHtmlParser(
    decodeHTML(langObj.localStartButtonText)
  );

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
      // let target;
      if (event.key === "Enter") {
        let isInputComplete = checkForNextPageConditions();
        if (isInputComplete) {
          history.push(`/presort`);
        }
      }
    }; // end keyup

    window.addEventListener("keyup", handleKeyUpStart);

    return () => window.removeEventListener("keyup", handleKeyUpStart);
  }, [history, checkForNextPageConditions]);

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
      }}
      tabindex="3"
    >
      {localStartButtonText}
    </StyledSubmitButton>
  );
};
export default view(withRouter(LogInSubmitButton));

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
