import React from "react";
import { view } from "@risingstack/react-easy-state";
// import getGlobalState from "../../globalState/getGlobalState";
// import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";

const LogInScreen = () => {
  const langObj = JSON.parse(localStorage.getItem("langObj"));
  const configObj = JSON.parse(localStorage.getItem("configObj"));
  const displayAccessCodeWarning = getGlobalState("displayAccessCodeWarning");
  const displayPartIdWarning = getGlobalState("displayPartIdWarning");
  const welcomeText = decodeHTML(langObj.loginWelcomeText);

  const handleInput = (e) => {
    setGlobalState("userInputPartId", e.target.value);
  };

  const handleAccess = (e) => {
    setGlobalState("userInputAccessCode", e.target.value);
  };

  const handleSubmit = () => {
    let userPartIdOK = false;
    let userAccessOK = false;
    const projectAccessCode = configObj.accessCode;

    // get user input
    const userInputPartId = getGlobalState("userInputPartId");
    const userInputAccessCode = getGlobalState("userInputAccessCode");

    if (userInputPartId.length > 0) {
      userPartIdOK = true;
    } else {
    }
    if (userInputAccessCode === projectAccessCode) {
      userAccessOK = true;
    }

    // invalid input ==> display warnings
    if (userAccessOK && userPartIdOK) {
      setGlobalState("displayLandingContent", true);
      setGlobalState("displayContinueButton", true);
      setGlobalState("partId", userInputPartId);
      setGlobalState("displayNextButton", true);
    } else if (userAccessOK === false) {
      setGlobalState("displayAccessCodeWarning", true);
      setTimeout(() => {
        setGlobalState("displayAccessCodeWarning", false);
      }, 5000);
    } else if (userPartIdOK === false) {
      setGlobalState("displayPartIdWarning", true);
      setTimeout(() => {
        setGlobalState("displayPartIdWarning", false);
      }, 5000);
    }
  };

  return (
    <React.Fragment>
      <LogInWelcomeText>{ReactHtmlParser(welcomeText)}</LogInWelcomeText>
      <Container>
        <div>
          <h2>{langObj.loginHeaderText}</h2>
          <StyledHr />
        </div>
        <div>
          <h3>{langObj.loginPartIdText}</h3>
          <StyledInputDiv>
            <StyledInput onChange={handleInput} type="text" />
            {displayPartIdWarning && (
              <WarningText>{langObj.partIdWarning}</WarningText>
            )}
          </StyledInputDiv>
        </div>
        <div>
          <h3>{langObj.accessInputText}</h3>
          <StyledInputDiv>
            <StyledInput onChange={handleAccess} type="text" />
            {displayAccessCodeWarning && (
              <WarningText>{langObj.accessCodeWarning}</WarningText>
            )}
          </StyledInputDiv>
        </div>
        <LogInSubmitButton onClick={handleSubmit} />
      </Container>
      <WarningText>{}</WarningText>
    </React.Fragment>
  );
};

export default view(LogInScreen);

const Container = styled.div`
  display: grid;
  grid-template-rows: 23% 28% 28% 1fr;
  margin-top: 50px;
  width: 700px;
  padding: 20px;
  min-height: 400px;
  margin-bottom: 200px;
  border: 2px solid black;
  justify-self: center;
  background-color: whitesmoke;
`;

const LogInWelcomeText = styled.div`
  width: 900px;
  font-size: 25px;
  line-height: 1.3em;
  padding-left: 35px;
`;

const StyledHr = styled.hr`
  margin-top: 5px;
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
  margin-top: 5px;
  width: 400px;
  height: 30px;
  font-size: 1.4em;
  padding-left: 5px;
`;

const StyledInputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const WarningText = styled.div`
  color: red;
  font-weight: bold;
  font-size: 1.4em;
  margin-left: 10px;
`;
