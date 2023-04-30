import React, { useState } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;

const CopyToClipboardButton = (props) => {
  console.log("props: " + JSON.stringify(props));

  // STATE
  // const langObj = useSettingsStore(getLangObj);
  //const btnTransferText = ReactHtmlParser(decodeHTML(langObj.clipboardText));
  const [result, setResult] = useState("");

  // async generic function for copying to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      setResult("success");
    } catch (err) {
      setResult("error");
      console.error("Failed to copy: ", err);
    } finally {
      setTimeout(() => setResult(""), 3000);
    }
  }

  const handleClick = (e) => {
    copyToClipboard(props.content).then(() => {
      console.log("copied to clipboard");
    });
  };

  return (
    <React.Fragment>
      <ContainerDiv>
        <StyledButton tabindex="1" onClick={(e) => handleClick(e)}>
          {props.text}
        </StyledButton>
        <MessageDiv>
          {result === "success" && "Copied!"}
          {result === "error" && `Error: Please try again.`}
        </MessageDiv>
      </ContainerDiv>
    </React.Fragment>
  );
};

export default CopyToClipboardButton;

const StyledButton = styled.button`
  grid-area: b;
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
`;

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  align-items: center;
  grid-template-areas: "a b c";
`;

const MessageDiv = styled.div`
  grid-area: c;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 0.7em;
`;
