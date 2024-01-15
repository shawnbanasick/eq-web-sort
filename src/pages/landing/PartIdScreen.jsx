import React, { useEffect } from "react";
import styled from "styled-components";
import LogInSubmitButton from "./LogInSubmitButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getDisplayPartIdWarning = (state) => state.displayPartIdWarning;
const getSetUserInputPartId = (state) => state.setUserInputPartId;
const getUserInputPartId = (state) => state.userInputPartId;
const getSetDisplayLandingContent = (state) => state.setDisplayLandingContent;
const getSetPartId = (state) => state.setPartId;
const getSetDisplayNextButton = (state) => state.setDisplayNextButton;
const getSetIsLoggedIn = (state) => state.setIsLoggedIn;
const getSetDisplayPartIdWarning = (state) => state.setDisplayPartIdWarning;

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const displayPartIdWarning = useStore(getDisplayPartIdWarning);
  const setUserInputPartId = useStore(getSetUserInputPartId);
  const userInputPartId = useStore(getUserInputPartId);
  const setDisplayLandingContent = useStore(getSetDisplayLandingContent);
  const setPartId = useStore(getSetPartId);
  const setDisplayNextButton = useStore(getSetDisplayNextButton);
  const setIsLoggedIn = useStore(getSetIsLoggedIn);
  const setDisplayPartIdWarning = useStore(getSetDisplayPartIdWarning);

  const loginHeaderText =
    ReactHtmlParser(decodeHTML(langObj.loginHeaderText)) || "";
  const loginPartIdText =
    ReactHtmlParser(decodeHTML(langObj.loginPartIdText)) || "";
  const partIdWarning =
    ReactHtmlParser(decodeHTML(langObj.partIdWarning)) || "";

  const handleInput = (e) => {
    setUserInputPartId(e.target.value);
  };

  useEffect(() => {
    const handleKeyUpStart = (event) => {
      if (event.key === "Enter") {
        console.log("Enter");
        let userPartIdOK = false;

        // get user input
        if (userInputPartId.length > 0) {
          userPartIdOK = true;
          setDisplayLandingContent(true);
          setPartId(userInputPartId);
          localStorage.setItem("partId", userInputPartId);
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
      }
    }; // end keyup

    window.addEventListener("keyup", handleKeyUpStart);

    return () => window.removeEventListener("keyup", handleKeyUpStart);
  }, [
    setDisplayLandingContent,
    setPartId,
    setDisplayNextButton,
    setIsLoggedIn,
    userInputPartId,
    setDisplayPartIdWarning,
  ]);

  const handleSubmit = (e) => {
    let userPartIdOK = false;

    // get user input
    if (userInputPartId.length > 0) {
      userPartIdOK = true;
      setDisplayLandingContent(true);
      setPartId(userInputPartId);
      localStorage.setItem("partId", userInputPartId);
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
          <StyledInput onChange={handleInput} type="text" autoFocus />
          {displayPartIdWarning && <WarningText>{partIdWarning}</WarningText>}
        </StyledInputDiv>
      </div>

      <LogInSubmitButton onClick={handleSubmit} />
    </Container>
  );
};

export default LogInScreen;

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
