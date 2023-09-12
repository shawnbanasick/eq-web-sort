import React from "react";
import styled from "styled-components";
import LocalStartButton from "./LocalStartButton";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import LocalDeleteButton from "./LocalDeleteButton";
import LocalSortsDownloadButton from "./LocalSortsDownloadButton";
import LocalDeleteModal from "./LocalDeleteModal";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";
import useLocalPersist from "../../globalState/useLocalPersist";
import LocalSaveBeforeDeleteModal from "./LocalSaveBeforeDeleteModal";

function downloadObjectAsJson(exportObj, exportName) {
  console.log("download called");
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

const getDisplayLocalPartIdWarn1 = (state) => state.displayLocalPartIdWarning1;
const getSetLocalPartIdWarning1 = (state) => state.setLocalPartIdWarning1;
const getDisplayLocalPartIdWarn2 = (state) => state.displayLocalPartIdWarning2;
const getSetLocalPartIdWarning2 = (state) => state.setLocalPartIdWarning2;
const getSetLocalDeleteModal = (state) => state.setLocalDeleteModal;
const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getSetLocalParticipantName = (state) => state.setLocalParticipantName;
const getSetLocalUsercode = (state) => state.setLocalUsercode;
const getLocalStoredQsorts = (state) => state.localStoredQsorts;
const getSetHasDownloadedQsorts = (state) => state.setHasDownloadedQsorts;
const getHasDownloadedQsorts = (state) => state.hasDownloadedQsorts;
const getSetTriggerSaveBeforeDeleteModal = (state) =>
  state.setTriggerSaveBeforeDeleteModal;

const LogInScreen = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const displayPartIdWarning1 = useStore(getDisplayLocalPartIdWarn1);
  const setLocalPartIdWarning1 = useStore(getSetLocalPartIdWarning1);
  const displayPartIdWarning2 = useStore(getDisplayLocalPartIdWarn2);
  const setLocalPartIdWarning2 = useStore(getSetLocalPartIdWarning2);
  const setLocalDeleteModal = useStore(getSetLocalDeleteModal);
  const setLocalParticipantName = useStore(getSetLocalParticipantName);
  const setLocalUsercode = useStore(getSetLocalUsercode);
  const localStoredQsorts = useLocalPersist(getLocalStoredQsorts);
  const hasDownloadedQsorts = useLocalPersist(getHasDownloadedQsorts);
  const setHasDownloadedQsorts = useLocalPersist(getSetHasDownloadedQsorts);
  const setTriggerSaveBeforeDeleteModal = useStore(
    getSetTriggerSaveBeforeDeleteModal
  );

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

  const headerText = `${storedQsortsHeaderText}: ${
    Object.keys(localStoredQsorts).length
  } ${localParticipantsText}`;

  const handleInput = (e) => {
    setLocalParticipantName(e.target.value);
    setLocalPartIdWarning1(false);
  };

  const handleUsercodeInput = (e) => {
    setLocalUsercode(e.target.value);
    // in case there is any value lingering from testing other setup targets
    localStorage.setItem("urlUsercode", "");
    setLocalPartIdWarning2(false);
  };

  const handleDeleteLocal = (e) => {
    // console.log(hasDownloadedQsorts);
    if (hasDownloadedQsorts) {
      setLocalDeleteModal(true);
    } else {
      // console.log("false branch");
      setTriggerSaveBeforeDeleteModal(true);
    }
  };

  const handleDownloadLocal = (e) => {
    // console.log(JSON.stringify(localStoredQsorts));
    const studyTitle = configObj.studyTitle;
    const myDate = new Date();
    const myDateString =
      ("0" + myDate.getFullYear()).slice(-2) +
      "-" +
      ("0" + (myDate.getMonth() + 1)).slice(-2) +
      "-" +
      myDate.getDate() +
      "_" +
      ("0" + myDate.getHours()).slice(-2) +
      "-" +
      ("0" + myDate.getMinutes()).slice(-2) +
      "-" +
      ("0" + myDate.getSeconds()).slice(-2);

    const exportName = studyTitle + "_" + myDateString;
    if (Object.keys(localStoredQsorts).length > 0) {
      downloadObjectAsJson(localStoredQsorts, exportName);
    }
    setHasDownloadedQsorts(true);
  };

  return (
    <>
      <Container>
        <LocalDeleteModal />
        <LocalSaveBeforeDeleteModal />
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
        <LocalStartButton tabindex="3" to={`/presort`} />
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

export default LogInScreen;

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
