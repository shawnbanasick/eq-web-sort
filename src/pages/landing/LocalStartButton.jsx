import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import { withRouter } from "react-router";
import setGlobalState from "../../globalState/setGlobalState";

const LogInSubmitButton = (props) => {
  const langObj = getGlobalState("langObj");
  const localStartButtonText = ReactHtmlParser(
    decodeHTML(langObj.localStartButtonText)
  );

  const checkForNextPageConditions = () => {
    let value0 = false;
    let value1;
    let value2;
    let localParticipantName = getGlobalState("localParticipantName");
    let localUsercode = getGlobalState("localUsercode");

    if (localParticipantName.length === 0) {
      value1 = false;
      setGlobalState("displayLocalPartIdWarning1", true);
    } else {
      setGlobalState("displayLocalPartIdWarning1", false);
      value1 = true;
    }

    if (localUsercode.length === 0) {
      value2 = false;
      setGlobalState("displayLocalPartIdWarning2", true);
    } else {
      setGlobalState("displayLocalPartIdWarning2", false);
      value2 = true;
    }

    if (value1 === true && value2 === true) {
      value0 = true;
    } else {
      value0 = false;
    }

    return value0;
  };

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
    // clear local fields on load
    // setGlobalState("localParticipantName", "");
    // setGlobalState("localUsercode", "");

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
  }, [history]);

  useEffect(() => {
    setGlobalState("localParticipantName", "");
    setGlobalState("localUsercode", "");
    setGlobalState("displayLocalPartIdWarning1", false);
    setGlobalState("displayLocalPartIdWarning2", false);
  }, []);

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
