import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";

const LogInScreen = () => {
  const langObj = getGlobalState("langObj");
  const configObj = getGlobalState("configObj");
  const displayAccessCodeWarning = getGlobalState("displayAccessCodeWarning");

  const handleAccess = (e) => {
    setGlobalState("userInputAccessCode", e.target.value);
  };

  const handleSubmit = (e) => {
    let userAccessOK = false;
    const projectAccessCode = configObj.accessCode;

    // get user input
    const userInputAccessCode = getGlobalState("userInputAccessCode");

    if (userInputAccessCode === projectAccessCode) {
      userAccessOK = true;
      setGlobalState("displayLandingContent", true);
      setGlobalState("displayNextButton", true);
      setGlobalState("isLoggedIn", true);
    }

    // invalid input ==> display warnings
    if (userAccessOK === false) {
      setGlobalState("displayAccessCodeWarning", true);
      setTimeout(() => {
        setGlobalState("displayAccessCodeWarning", false);
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
