import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerSortModal = (state) => state.triggerSortModal;
const getSetTriggerSortModal = (state) => state.setTriggerSortModal;

const SortHelpModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerSortModal = useStore(getTriggerSortModal);
  const setTriggerSortModal = useStore(getSetTriggerSortModal);

  const helpModalHead = ReactHtmlParser(decodeHTML(langObj.sortHelpModalHead));
  const helpModalText = ReactHtmlParser(decodeHTML(langObj.sortHelpModalText));

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerSortModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerSortModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{helpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{helpModalText}</ModalContent>
    </Modal>
  );
};

export default SortHelpModal;

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
