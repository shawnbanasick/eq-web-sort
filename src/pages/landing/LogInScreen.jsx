import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import useSettingsStore from "../../globalState/useSettingsStore";

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const configObj = useSettingsStore((state) => state.configObj);

  const displayAccessCodeWarning = getGlobalState("displayAccessCodeWarning");
  const displayPartIdWarning = getGlobalState("displayPartIdWarning");
  const welcomeText = ReactHtmlParser(decodeHTML(langObj.loginWelcomeText));
  const loginHeaderText = ReactHtmlParser(decodeHTML(langObj.loginHeaderText));
  const loginPartIdText = ReactHtmlParser(decodeHTML(langObj.loginPartIdText));
  const partIdWarning = ReactHtmlParser(decodeHTML(langObj.partIdWarning));
  const accessCodeWarning = ReactHtmlParser(
    decodeHTML(langObj.accessCodeWarning)
  );
  const accessInputText = ReactHtmlParser(decodeHTML(langObj.accessInputText));

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
      setGlobalState("isLoggedIn", true);
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
      <LogInWelcomeText>{welcomeText}</LogInWelcomeText>
      <Container>
        <div>
          <h2>{loginHeaderText}</h2>
          <StyledHr />
        </div>
        <div>
          <h3>{loginPartIdText}</h3>
          <StyledInputDiv>
            <StyledInput onChange={handleInput} type="text" />
            {displayPartIdWarning && <WarningText>{partIdWarning}</WarningText>}
          </StyledInputDiv>
        </div>
        <div>
          <h3>{accessInputText}</h3>
          <StyledInputDiv>
            <StyledInput onChange={handleAccess} type="text" />
            {displayAccessCodeWarning && (
              <WarningText>{accessCodeWarning}</WarningText>
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
  width: 800px;
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
