import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import ReturnToLocalPanelButton from "./ReturnToLocalPanelButton";

const getLangObj = (state) => state.langObj;
const getTrigLclSubmitSucMdl = (state) => state.triggerLocalSubmitSuccessModal;

const LocalSubmitSuccessModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerModalOpen = useStore(getTrigLclSubmitSucMdl);

  const modalHead =
    ReactHtmlParser(decodeHTML(langObj.localSubmitSuccessModalHeader)) || "";
  const modalText =
    ReactHtmlParser(decodeHTML(langObj.localSubmitSuccessModalText)) || "";

  const onCloseModal = () => {};

  return (
    <Modal
      className="customModal"
      open={triggerModalOpen}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{modalHead}</ModalHeader>
      <hr />
      <ModalContent>{modalText}</ModalContent>
      <ButtonContainer>
        <ReturnToLocalPanelButton />
      </ButtonContainer>
    </Modal>
  );
};

export default LocalSubmitSuccessModal;

const ModalHeader = styled.div`
  font-size: 24px;
  line-height: 1.42;
  padding: 10px 0px 10px 0px;

  hr {
    color: black;
  }
`;

const ModalContent = styled.div`
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
// react-responsive-modal-overlay
