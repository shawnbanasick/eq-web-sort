import React, { useEffect } from "react";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import LocalStartButton from "./LocalStartButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import LocalDeleteButton from "./LocalDeleteButton";
import LocalSortsDownloadButton from "./LocalSortsDownloadButton";
import LocalDeleteModal from "./LocalDeleteModal";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const LogInScreen = () => {
  // const displayPartIdWarning1 = getGlobalState("displayLocalPartIdWarning1");
  // const displayPartIdWarning2 = getGlobalState("displayLocalPartIdWarning2");

  // STATE
  const displayPartIdWarning1 = useStore(
    (state) => state.displayLocalPartIdWarning1
  );
  const setLocalPartIdWarning1 = useStore(
    (state) => state.setLocalPartIdWarning1
  );

  const displayPartIdWarning2 = useStore(
    (state) => state.displayLocalPartIdWarning2
  );
  const setLocalPartIdWarning2 = useStore(
    (state) => state.setLocalPartIdWarning2
  );
  const setLocalDeleteModal = useStore((state) => state.setLocalDeleteModal);
  const langObj = useSettingsStore((state) => state.langObj);

  // setup language
  // const langObj = getGlobalState("langObj");

  const loginHeaderText = ReactHtmlParser(decodeHTML(langObj.localHeader));
  const loginPartIdText = ReactHtmlParser(decodeHTML(langObj.partIdText));
  const partIdWarning = ReactHtmlParser(decodeHTML(langObj.partIdWarning));
  const usercodeText = ReactHtmlParser(decodeHTML(langObj.usercodeText));
  const localParticipantsText = ReactHtmlParser(
    decodeHTML(langObj.localParticipantsText)
  );
  const storedQsortsHeaderText = ReactHtmlParser(
    decodeHTML(langObj.storedQsortsHeaderText)
  );

  let localStoredQsortsFromLocalStorage;

  useEffect(() => {
    localStoredQsortsFromLocalStorage = JSON.parse(
      localStorage.getItem("localStoredQsorts")
    );
    if (!localStoredQsortsFromLocalStorage) {
      localStoredQsortsFromLocalStorage = {};
    }
    setGlobalState("localStoredQsorts", localStoredQsortsFromLocalStorage);
  }, [localStoredQsortsFromLocalStorage]);
  console.log(localStoredQsortsFromLocalStorage);

  const localStoredQsorts = getGlobalState("localStoredQsorts");

  const headerText = `${storedQsortsHeaderText}: ${
    Object.keys(localStoredQsorts).length
  } ${localParticipantsText}`;

  const handleInput = (e) => {
    setGlobalState("localParticipantName", e.target.value);
    // setGlobalState("displayLocalPartIdWarning1", false);
    setLocalPartIdWarning1(false);
  };

  const handleUsercodeInput = (e) => {
    setGlobalState("localUsercode", e.target.value);
    // setGlobalState("displayLocalPartIdWarning2", false);
    setLocalPartIdWarning2(false);
  };

  const handleDeleteLocal = (e) => {
    console.log("delete clicked");
    // setGlobalState("triggerLocalDeleteModal", true);
    setLocalDeleteModal(true);
  };

  const handleDownloadLocal = (e) => {
    const exportObj = JSON.parse(localStorage.getItem("localStoredQsorts"));
    const exportName = "Qsorts";
    if (exportObj.length > 0) {
      downloadObjectAsJson(exportObj, exportName);
    }
    console.log("download clicked");
  };

  return (
    <>
      <Container>
        <LocalDeleteModal />
        <div>
          <h2>{loginHeaderText}</h2>
          <StyledHr />
        </div>

        <div>
          <h3>{loginPartIdText}</h3>
          <StyledInputDiv>
            <StyledInput tabindex="0" onChange={handleInput} type="text" />
            {displayPartIdWarning1 && (
              <WarningText>{partIdWarning}</WarningText>
            )}
          </StyledInputDiv>
        </div>
        <LocalStartButton tabindex="3" to={`/presort`} />
        <div>
          {" "}
          <h3>{usercodeText}</h3>
          <StyledInputDiv>
            <StyledInput
              tabindex="1"
              onChange={handleUsercodeInput}
              type="text"
            />
            {displayPartIdWarning2 && (
              <WarningText>{partIdWarning}</WarningText>
            )}
          </StyledInputDiv>
        </div>
      </Container>
      <Container2>
        <StoredHeader>
          <div>{headerText}</div>
        </StoredHeader>
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
