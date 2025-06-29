import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import { withRouter } from "react-router";
import useStore from "../../globalState/useStore";
import cloneDeep from "lodash/cloneDeep";

const getLangObj = (state) => state.langObj;
const getSetPresortNoReturn = (state) => state.setPresortNoReturn;
const getSetColumnStatements = (state) => state.setColumnStatements;
const getResetColumnStatements = (state) => state.resetColumnStatements;

const ReturnToLocalPanelButton = (props) => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const setPresortNoReturn = useStore(getSetPresortNoReturn);
  const setColumnStatements = useSettingsStore(getSetColumnStatements);
  const resetColumnStatements = useSettingsStore(getResetColumnStatements);
  const newColumnStatements = cloneDeep(resetColumnStatements);

  const btnTransferText = ReactHtmlParser(decodeHTML(langObj.returnToLocalPanelButtonText)) || "";
  console.log(btnTransferText);
  const {
    history,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
  } = props;

  let reload = async function (history) {
    await new Promise((resolve, reject) => window.location.reload());
  };

  return (
    <React.Fragment>
      <StyledButton
        onClick={(event) => {
          onClick && onClick(event);
          setPresortNoReturn(false);
          setColumnStatements(newColumnStatements);
          history.push("/");
          reload();
        }}
      >
        {btnTransferText}
      </StyledButton>
    </React.Fragment>
  );
};
export default withRouter(ReturnToLocalPanelButton);

const StyledButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: auto;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: ${({ theme, active }) => (active ? theme.secondary : theme.primary)};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: ${({ theme }) => theme.focus};
  }
`;
