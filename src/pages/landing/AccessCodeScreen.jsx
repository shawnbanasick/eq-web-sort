import React from "react";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const configObj = useSettingsStore((state) => state.configObj);
  const displayAccessCodeWarning = useStore(
    (state) => state.displayAccessCodeWarning
  );
  const userInputAccessCode = useStore((state) => state.userInputAccessCode);

  const setDisplayLandingContent = useStore(
    (state) => state.setDisplayLandingContent
  );
  const setDisplayNextButton = useStore((state) => state.setDisplayNextButton);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setUserInputAccessCode = useStore(
    (state) => state.setUserInputAccessCode
  );
  const setDisplayAccessCodeWarning = useStore(
    (state) => state.setDisplayAccessCodeWarning
  );

  const handleAccess = (e) => {
    setUserInputAccessCode(e.target.value);
  };

  const handleSubmit = (e) => {
    let userAccessOK = false;
    const projectAccessCode = configObj.accessCode;

    // get user input

    if (userInputAccessCode === projectAccessCode) {
      userAccessOK = true;
      setDisplayLandingContent(true);
      setDisplayNextButton(true);
      setIsLoggedIn(true);
    }

    // invalid input ==> display warnings
    if (userAccessOK === false) {
      setDisplayAccessCodeWarning(true);
      setTimeout(() => {
        setDisplayAccessCodeWarning(false);
      }, 5000);
    }
  };

  return (
    <Container>
      <div>
        <h2>{langObj.loginHeaderText}</h2>
        <StyledHr />
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
  margin-bottom: 200px;
  border: 2px solid black;
  justify-self: center;
  background-color: whitesmoke;
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
