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
  const displayPartIdWarning = useStore((state) => state.displayPartIdWarning);
  const setUserInputPartId = useStore((state) => state.setUserInputPartId);
  const userInputPartId = useStore((state) => state.userInputPartId);
  const setDisplayLandingContent = useStore(
    (state) => state.setDisplayLandingContent
  );
  const setPartId = useStore((state) => state.setPartId);
  const setDisplayNextButton = useStore((state) => state.setDisplayNextButton);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setDisplayPartIdWarning = useStore(
    (state) => state.setDisplayPartIdWarning
  );

  const loginHeaderText = ReactHtmlParser(decodeHTML(langObj.loginHeaderText));
  const loginPartIdText = ReactHtmlParser(decodeHTML(langObj.loginPartIdText));
  const partIdWarning = ReactHtmlParser(decodeHTML(langObj.partIdWarning));

  const handleInput = (e) => {
    console.log(e.target.value);
    setUserInputPartId(e.target.value);
  };

  const handleSubmit = (e) => {
    let userPartIdOK = false;

    // get user input
    if (userInputPartId.length > 0) {
      userPartIdOK = true;
      setDisplayLandingContent(true);
      setPartId(userInputPartId);
      setDisplayNextButton(true);
      setIsLoggedIn(true);
    }

    // invalid input ==> display warnings
    if (userPartIdOK === false) {
      setDisplayPartIdWarning(true);
      setTimeout(() => {
        setDisplayPartIdWarning(false);
      }, 5000);
    }
  };

  return (
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
