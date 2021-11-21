import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

const LogInScreen = () => {
  const displayPartIdWarning = getGlobalState("displayPartIdWarning");

  // setup language
  const langObj = getGlobalState("langObj");
  const loginHeaderText = ReactHtmlParser(decodeHTML(langObj.loginHeaderText));
  const loginPartIdText = ReactHtmlParser(decodeHTML(langObj.loginPartIdText));
  const partIdWarning = ReactHtmlParser(decodeHTML(langObj.partIdWarning));

  return (
    <Container>
      <div>
        <center>
          <h2>Error - Internet Explorer Detected</h2>
          <StyledHr />
        </center>
      </div>
      <div>
        <h3>Internet Explorer cannot be used to access this survey</h3>
        <StyledInputDiv>
          <h3>Please use Microsoft Edge, Google Chrome, or Mozilla Firefox</h3>
        </StyledInputDiv>
      </div>
    </Container>
  );
};

export default view(LogInScreen);

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  margin-top: 50px;
  width: 50vw;
  padding: 1.5vw;
  min-height: 300px;
  margin-bottom: 20px;
  border: 2px solid black;
  justify-self: center;
  background-color: lightgoldenrodyellow;
  border-radius: 50px;
`;

const StyledHr = styled.hr`
  margin-top: 5px;
  margin-bottom: 30px;
`;

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
`;
