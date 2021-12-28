import styled from "styled-components";
import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import setGlobalState from "../../globalState/setGlobalState";

const LogInSubmitButton = (props) => {
  const langObj = getGlobalState("langObj");
  const localDeleteButtonText = ReactHtmlParser(
    decodeHTML(langObj.localDeleteButtonText)
  );

  const clearLocalStorage = () => {
    console.log("deleted localStorage");
    localStorage.setItem("localStoredQsorts", JSON.stringify({}));
    setGlobalState("localStoredQsorts", {});
  };

  return (
    <StyledSubmitButton tabindex="0" type="submit" onClick={clearLocalStorage}>
      {localDeleteButtonText}
    </StyledSubmitButton>
  );
};
export default view(LogInSubmitButton);

const StyledSubmitButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 200px;
  height: 50px;
  justify-self: right;
  align-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;

  &:hover {
  }

  &:focus {
  }
`;
