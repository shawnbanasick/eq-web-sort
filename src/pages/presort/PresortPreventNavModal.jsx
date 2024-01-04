import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerModalOpen = (state) => state.triggerPresortPreventNavModal;
const getSetTrigPrePrevNavModal = (state) =>
  state.setTriggerPresortPreventNavModal;

const PresortPreventNavModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerModalOpen = useStore(getTriggerModalOpen);
  const setTriggerPresortPreventNavModal = useStore(getSetTrigPrePrevNavModal);

  const modalHead =
    ReactHtmlParser(decodeHTML(langObj.presortPreventNavModalHead)) || "";
  const modalText =
    ReactHtmlParser(decodeHTML(langObj.presortPreventNavModalText)) || "";

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerPresortPreventNavModal(false);
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

export default PresortPreventNavModal;

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
