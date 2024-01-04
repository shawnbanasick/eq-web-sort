import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerModalOpen = (state) => state.triggerSortPreventNavModal;
const getSetTriggerSortPreventNavModal = (state) =>
  state.setTriggerSortPreventNavModal;

const PresortPreventNavModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerModalOpen = useStore(getTriggerModalOpen);
  const setTriggerSortPreventNavModal = useStore(
    getSetTriggerSortPreventNavModal
  );

  const modalHead =
    ReactHtmlParser(decodeHTML(langObj.sortPreventNavModalHead)) || "";
  const modalText =
    ReactHtmlParser(decodeHTML(langObj.sortPreventNavModalText)) || "";

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerSortPreventNavModal(false);
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
