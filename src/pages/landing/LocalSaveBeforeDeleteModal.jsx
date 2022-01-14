import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";

const getLangObj = (state) => state.langObj;
const getTriggerSaveBeforeDeleteModal = (state) =>
  state.triggerSaveBeforeDeleteModal;
const getSetTriggerSaveBeforeDeleteModal = (state) =>
  state.setTriggerSaveBeforeDeleteModal;

const LocalDeleteModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerSaveBeforeDeleteModal = useStore(
    getTriggerSaveBeforeDeleteModal
  );
  const setTriggerSaveBeforeDeleteModal = useStore(
    getSetTriggerSaveBeforeDeleteModal
  );

  const localDeleteModalHead = ReactHtmlParser(
    decodeHTML(langObj.LocalSaveBeforeDeleteModalHeader)
  );
  const localDeleteModalText = ReactHtmlParser(
    decodeHTML(langObj.LocalSaveBeforeDeleteModalText)
  );

  const onCloseModal = () => {
    setTriggerSaveBeforeDeleteModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerSaveBeforeDeleteModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{localDeleteModalHead}</ModalHeader>
      <hr />
      <ModalContent>{localDeleteModalText}</ModalContent>
    </Modal>
  );
};

export default LocalDeleteModal;

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
