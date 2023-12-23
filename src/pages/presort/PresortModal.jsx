import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const PresortModal = () => {
  const getLangObj = (state) => state.langObj;
  const getTriggerPresortModal = (state) => state.triggerPresortModal;
  const getSetTriggerPresortModal = (state) => state.setTriggerPresortModal;

  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerPresortModal = useStore(getTriggerPresortModal);
  const setTriggerPresortModal = useStore(getSetTriggerPresortModal);

  const hasPresortSortingStarted = localStorage.getItem("columns");
  if (hasPresortSortingStarted && hasPresortSortingStarted.length > 0) {
    setTriggerPresortModal(false);
  }

  const onCloseModal = () => {
    setTriggerPresortModal(false);
  };

  const header = ReactHtmlParser(decodeHTML(langObj.presortModalHead));
  const modalText = ReactHtmlParser(decodeHTML(langObj.presortModalText));

  return (
    <Modal
      className="customModal"
      open={triggerPresortModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{header}</ModalHeader>
      <hr />
      <ModalContent>{modalText}</ModalContent>
    </Modal>
  );
};

export default PresortModal;

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
