import styled from "styled-components";
import React, { useEffect } from "react";
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
    let returnValue;
    let returnValue1;
    let returnValue2;

    let localParticipantName = getGlobalState("localParticipantName");
    console.log(localParticipantName.length);
    let localUsercode = getGlobalState("localUsercode");
    console.log(localUsercode.length);

    if (localParticipantName.length === 0) {
      returnValue1 = false;
      setGlobalState("displayLocalPartIdWarning1", true);
    } else {
      setGlobalState("displayLocalPartIdWarning1", false);
      returnValue1 = true;
    }

    if (localUsercode.length === 0) {
      returnValue2 = false;
      setGlobalState("displayLocalPartIdWarning2", true);
    } else {
      setGlobalState("displayLocalPartIdWarning2", false);
      returnValue2 = true;
    }

    if (returnValue1 === true && returnValue2 === true) {
      returnValue = true;
    } else {
      returnValue = false;
    }

    return returnValue;
  };
  let goToNextPage;

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
    setGlobalState("localParticipantName", "");
    setGlobalState("localUsercode", "");

    const handleKeyUpStart = (event) => {
      // let target;
      if (event.key === "Enter") {
        goToNextPage = checkForNextPageConditions();
        if (goToNextPage) {
          history.push(`/presort`);
        }
      }
    }; // end keyup

    window.addEventListener("keyup", handleKeyUpStart);

    return () => window.removeEventListener("keyup", handleKeyUpStart);
  }, [history]);

  return (
    <StyledSubmitButton
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event);
        goToNextPage = checkForNextPageConditions();
        if (goToNextPage) {
          history.push(to);
        }
      }}
      tabindex="0"
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
