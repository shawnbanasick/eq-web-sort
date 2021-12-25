import React from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import LocalStartButton from "./LocalStartButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import LocalDeleteButton from "./LocalDeleteButton";
import LocalSortsDownloadButton from "./LocalSortsDownloadButton";

const LogInScreen = () => {
  const displayPartIdWarning = getGlobalState("displayPartIdWarning");

  // setup language
  const langObj = getGlobalState("langObj");
  const loginHeaderText = ReactHtmlParser(decodeHTML(langObj.localHeader));
  const loginPartIdText = ReactHtmlParser(decodeHTML(langObj.partIdText));
  const partIdWarning = ReactHtmlParser(decodeHTML(langObj.partIdWarning));
  const usercodeText = ReactHtmlParser(decodeHTML(langObj.usercodeText));
  const storedQsortsHeaderText = ReactHtmlParser(
    decodeHTML(langObj.storedQsortsHeaderText)
  );

  const headerText = `${storedQsortsHeaderText}: 17 participants`;

  const handleInput = (e) => {
    console.log(e.target.value);
    setGlobalState("userInputPartId", e.target.value);
  };

  const handleUsercodeInput = (e) => {
    console.log(e.target.value);
    setGlobalState("usercodeText", e.target.value);
  };

  const handleStart = (e) => {
    console.log("start clicked");

    /*
    let userPartIdOK = false;

    // get user input
    const userInputPartId = getGlobalState("userInputPartId");

    if (userInputPartId.length > 0) {
      userPartIdOK = true;
      setGlobalState("displayLandingContent", true);
      setGlobalState("partId", userInputPartId);
      setGlobalState("displayNextButton", true);
      setGlobalState("isLoggedIn", true);
    }

    // invalid input ==> display warnings
    if (userPartIdOK === false) {
      setGlobalState("displayPartIdWarning", true);
      setTimeout(() => {
        setGlobalState("displayPartIdWarning", false);
      }, 5000);
    }
    */
  };

  const handleDeleteLocal = (e) => {
    console.log("delete clicked");
  };
  const handleDownloadLocal = (e) => {
    console.log("download clicked");
  };

  return (
    <>
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
        <LocalStartButton onClick={handleStart} to={`/presort`} />
        <div>
          {" "}
          <h3>{usercodeText}</h3>
          <StyledInputDiv>
            <StyledInput onChange={handleUsercodeInput} type="text" />
            {displayPartIdWarning && <WarningText>{partIdWarning}</WarningText>}
          </StyledInputDiv>
        </div>
      </Container>
      <Container2>
        <StoredHeader>{headerText}</StoredHeader>
        <ButtonContainer>
          <LocalDeleteButton onClick={handleDeleteLocal}>
            Delete
          </LocalDeleteButton>
          <LocalSortsDownloadButton onClick={handleDownloadLocal}>
            Download
          </LocalSortsDownloadButton>
        </ButtonContainer>
      </Container2>
    </>
  );
};

export default view(LogInScreen);

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  margin-top: 10px;
  width: 70vw;
  padding: 1.5vw;
  min-height: 350px;
  margin-bottom: 0px;
  border: 2px solid black;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  justify-self: center;
  background-color: whitesmoke;
`;

const Container2 = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  margin-top: 0px;
  width: 70vw;
  padding: 1.5vw;
  min-height: 100px;
  margin-bottom: 100px;
  border-right: 2px solid black;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
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

const StoredHeader = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
