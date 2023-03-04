import React, { useState } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;

const CopyToClipboardButton = (props) => {
  console.log("props: " + JSON.stringify(props));

  // STATE
  // const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);

  const btnTransferText = ReactHtmlParser(decodeHTML(configObj.clipboardText));

  const handleClick = (e) => {
    // create results object for transmission
    let formattedResultsTxt = ``;
    for (const [key, value] of Object.entries(props.results)) {
      formattedResultsTxt = formattedResultsTxt + `${key}: ${value} * `;
    }

    navigator.clipboard.writeText(formattedResultsTxt);
  };

  return (
    <React.Fragment>
      <StyledButton tabindex="1" onClick={(e) => handleClick(e)}>
        {btnTransferText}
      </StyledButton>
    </React.Fragment>
  );
};
export default CopyToClipboardButton;

const StyledButton = styled.button`
  border-color: #2e6da4;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  min-width: 200px;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.primary};

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:focus {
    background-color: green;
  }
`;

const DisabledButton = styled.button`
  border-color: lightgray;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  padding: 0.25em 1em;
  border-radius: 3px;
  text-decoration: none;
  width: 200px;
  height: 50px;
  justify-self: right;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: lightgray;
`;
