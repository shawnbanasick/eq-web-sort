import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const PresortPreventNavModal = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const triggerModalOpen = useStore(
    (state) => state.triggerPresortPreventNavModal
  );
  const setTriggerPresortPreventNavModal = useStore(
    (state) => state.setTriggerPresortPreventNavModal
  );

  const modalHead = ReactHtmlParser(
    decodeHTML(langObj.presortPreventNavModalHead)
  );
  const modalText = ReactHtmlParser(
    decodeHTML(langObj.presortPreventNavModalText)
  );

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

export default view(PresortPreventNavModal);

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
