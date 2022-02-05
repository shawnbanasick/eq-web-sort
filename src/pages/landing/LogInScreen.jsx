import React, { useEffect } from "react";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getDisplayAccessCodeWarning = (state) => state.displayAccessCodeWarning;
const getDisplayPartIdWarning = (state) => state.displayPartIdWarning;
const getSetUserInputPartId = (state) => state.setUserInputPartId;
const getSetUserInputAccessCode = (state) => state.setUserInputAccessCode;
const getUserInputPartId = (state) => state.userInputPartId;
const getUserInputAccessCode = (state) => state.userInputAccessCode;
const getSetDisplayLandingContent = (state) => state.setDisplayLandingContent;
const getSetDisplayContinueButton = (state) => state.setDisplayContinueButton;
const getSetPartId = (state) => state.setPartId;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getSetIsLoggedIn = (state) => state.setIsLoggedIn;
const getSetDisplayAccessCodeWarning = (state) =>
  state.setDisplayAccessCodeWarning;
const getSetDisplayPartIdWarning = (state) => state.setDisplayPartIdWarning;
const getDisplayNextButton = (state) => state.displayNextButton;

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const displayAccessCodeWarning = useStore(getDisplayAccessCodeWarning);
  const displayPartIdWarning = useStore(getDisplayPartIdWarning);
  const setUserInputPartId = useStore(getSetUserInputPartId);
  const setUserInputAccessCode = useStore(getSetUserInputAccessCode);
  const userInputPartId = useStore(getUserInputPartId);
  const userInputAccessCode = useStore(getUserInputAccessCode);
  const setDisplayLandingContent = useStore(getSetDisplayLandingContent);
  const setDisplayContinueButton = useStore(getSetDisplayContinueButton);
  const setPartId = useStore(getSetPartId);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const setIsLoggedIn = useStore(getSetIsLoggedIn);
  const setDisplayAccessCodeWarning = useStore(getSetDisplayAccessCodeWarning);
  const setDisplayPartIdWarning = useStore(getSetDisplayPartIdWarning);

  const welcomeText = ReactHtmlParser(decodeHTML(langObj.loginWelcomeText));
  const loginHeaderText = ReactHtmlParser(decodeHTML(langObj.loginHeaderText));
  const loginPartIdText = ReactHtmlParser(decodeHTML(langObj.loginPartIdText));
  const partIdWarning = ReactHtmlParser(decodeHTML(langObj.partIdWarning));
  const accessCodeWarning = ReactHtmlParser(
    decodeHTML(langObj.accessCodeWarning)
  );
  const accessInputText = ReactHtmlParser(decodeHTML(langObj.accessInputText));
  let displayNextButton = useStore(getDisplayNextButton);

  console.log(userInputPartId.length);
  console.log({ displayNextButton });

  const handleInput = (e) => {
    setUserInputPartId(e.target.value);
  };

  const handleAccess = (e) => {
    setUserInputAccessCode(e.target.value);
  };

  const handleSubmit = () => {
    try {
      let userPartIdOK = false;
      let userAccessOK = false;
      const projectAccessCode = configObj.accessCode;

      // get user input

      console.log(userInputPartId.length);

      if (userInputPartId.length > 1) {
        userPartIdOK = true;
      } else {
        userPartIdOK = false;
      }
      if (userInputAccessCode === projectAccessCode) {
        userAccessOK = true;
      }

      // invalid input ==> display warnings
      console.log({ userAccessOK, userPartIdOK });

      if (userAccessOK && userPartIdOK) {
        setDisplayLandingContent(true);
        //setDisplayContinueButton(true);
        setPartId(userInputPartId);
        setDisplayNextButton(true);
        setIsLoggedIn(true);
      } else if (userAccessOK === false) {
        console.log("no access code");
        setDisplayAccessCodeWarning(true);
        setDisplayNextButton(false);
        setTimeout(() => {
          setDisplayAccessCodeWarning(false);
        }, 5000);
      } else if (userPartIdOK === false) {
        setDisplayPartIdWarning(true);
        setDisplayNextButton(false);
        console.log("no id");

        setTimeout(() => {
          setDisplayPartIdWarning(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
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

export default LogInScreen;

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
