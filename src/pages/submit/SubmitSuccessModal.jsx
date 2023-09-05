import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerModalOpen = (state) => state.triggerTransmissionOKModal;
const getSetTriggerTransOKMod = (state) => state.setTriggerTransmissionOKModal;
const getSetDisplayGoodbyeMessage = (state) => state.setDisplayGoodbyeMessage;

const SubmitSuccessModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerModalOpen = useStore(getTriggerModalOpen);
  const setTriggerTransmissionOKModal = useStore(getSetTriggerTransOKMod);
  const setDisplayGoodbyeMessage = useStore(getSetDisplayGoodbyeMessage);

  const modalHead = ReactHtmlParser(decodeHTML(langObj.transferOkModalHeader));
  const modalText = ReactHtmlParser(decodeHTML(langObj.transferOkModalText));

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerTransmissionOKModal(false);
    setDisplayGoodbyeMessage(true);
    //document.getElementById("secondProjectLink").click();
  };

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
    </Modal>
  );
};

export default SubmitSuccessModal;

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

// react-responsive-modal-overlay
