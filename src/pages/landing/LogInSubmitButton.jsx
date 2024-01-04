import styled from "styled-components";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;

const LogInSubmitButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);

  const loginSubmitButtonText =
    ReactHtmlParser(decodeHTML(langObj.loginSubmitButtonText)) || "";

  return (
    <StyledSubmitButton tabindex="0" type="submit" onClick={props.onClick}>
      {loginSubmitButtonText}
    </StyledSubmitButton>
  );
};
export default LogInSubmitButton;

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
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;
