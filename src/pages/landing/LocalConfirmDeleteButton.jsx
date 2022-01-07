import styled from "styled-components";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";

const getSetterLocalQsorts = (state) => state.setLocalStoredQsorts;
const getLangObj = (state) => state.langObj;
const getSetLocalDeleteModal = (state) => state.setLocalDeleteModal;

const LogInSubmitButton = (props) => {
  // State
  const setDisplayLocalDeleteModal = useStore(getSetLocalDeleteModal);
  const setLocalStoredQsorts = useStore(getSetterLocalQsorts);
  const langObj = useSettingsStore(getLangObj);

  const localDeleteButtonText = ReactHtmlParser(
    decodeHTML(langObj.localDeleteButtonText)
  );

  const clearLocalStorage = () => {
    console.log("deleted localStorage");
    localStorage.setItem("localStoredQsorts", JSON.stringify({}));
    setLocalStoredQsorts({});
    setDisplayLocalDeleteModal(false);
  };

  return (
    <StyledSubmitButton tabindex="0" type="submit" onClick={clearLocalStorage}>
      {localDeleteButtonText}
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
  background-color: red;

  &:hover {
  }

  &:focus {
  }
`;
