import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const configObj = useSettingsStore((state) => state.configObj);
  const displayAccessCodeWarning = useStore(
    (state) => state.displayAccessCodeWarning
  );
  const displayPartIdWarning = useStore((state) => state.displayPartIdWarning);
  const setUserInputPartId = useStore((state) => state.setUserInputPartId);
  const setUserInputAccessCode = useStore(
    (state) => state.setUserInputAccessCode
  );
  const userInputPartId = useStore((state) => state.userInputPartId);
  const userInputAccessCode = useStore((state) => state.userInputAccessCode);
  const setDisplayLandingContent = useStore(
    (state) => state.setDisplayLandingContent
  );
  const setDisplayContinueButton = useStore(
    (state) => state.setDisplayContinueButton
  );
  const setPartId = useStore((state) => state.setPartId);
  const setDisplayNextButton = useStore((state) => state.setDisplayNextButton);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setDisplayAccessCodeWarning = useStore(
    (state) => state.setDisplayAccessCodeWarning
  );
  const setDisplayPartIdWarning = useStore(
    (state) => state.setDisplayPartIdWarning
  );

  const welcomeText = ReactHtmlParser(decodeHTML(langObj.loginWelcomeText));
  const loginHeaderText = ReactHtmlParser(decodeHTML(langObj.loginHeaderText));
  const loginPartIdText = ReactHtmlParser(decodeHTML(langObj.loginPartIdText));
  const partIdWarning = ReactHtmlParser(decodeHTML(langObj.partIdWarning));
  const accessCodeWarning = ReactHtmlParser(
    decodeHTML(langObj.accessCodeWarning)
  );
  const accessInputText = ReactHtmlParser(decodeHTML(langObj.accessInputText));

  const handleInput = (e) => {
    setUserInputPartId(e.target.value);
  };

  const handleAccess = (e) => {
    setUserInputAccessCode(e.target.value);
  };

  const handleSubmit = () => {
    let userPartIdOK = false;
    let userAccessOK = false;
    const projectAccessCode = configObj.accessCode;

    // get user input

    if (userInputPartId.length > 0) {
      userPartIdOK = true;
    } else {
    }
    if (userInputAccessCode === projectAccessCode) {
      userAccessOK = true;
    }

    // invalid input ==> display warnings
    if (userAccessOK && userPartIdOK) {
      setDisplayLandingContent(true);
      setDisplayContinueButton(true);
      setPartId(userInputPartId);
      setDisplayNextButton(true);
      setIsLoggedIn(true);
    } else if (userAccessOK === false) {
      setDisplayAccessCodeWarning(true);
      setTimeout(() => {
        setDisplayAccessCodeWarning(false);
      }, 5000);
    } else if (userPartIdOK === false) {
      setDisplayPartIdWarning(true);
      setTimeout(() => {
        setDisplayPartIdWarning(false);
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
