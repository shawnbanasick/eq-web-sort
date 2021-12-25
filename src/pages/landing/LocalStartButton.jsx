import styled from "styled-components";
import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import { withRouter } from "react-router";

const LogInSubmitButton = (props) => {
  const langObj = getGlobalState("langObj");
  const localStartButtonText = ReactHtmlParser(
    decodeHTML(langObj.localStartButtonText)
  );

  const checkForNextPageConditions = () => {
    return true;
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
    console.log("test");
    const handleKeyUpStart = (event) => {
      console.log(event.key);
      // let target;
      if (event.key === "Enter") {
        history.push(`/presort`);
      }
    }; // end keyup

    window.addEventListener("keyup", handleKeyUpStart);

    return () => window.removeEventListener("keyup", handleKeyUpStart);
  }, []);

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
