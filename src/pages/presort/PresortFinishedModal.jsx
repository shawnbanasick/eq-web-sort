import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const PresortFinishedModal = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const triggerModal = useStore((state) => state.triggerPresortFinishedModal);
  const setTriggerModal = useStore(
    (state) => state.setTriggerPresortFinishedModal
  );
  const loginHelpModalHead = ReactHtmlParser(
    decodeHTML(langObj.presortFinishedModalHead)
  );
  const loginHelpModalText = ReactHtmlParser(
    decodeHTML(langObj.presortFinishedModalText)
  );

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{loginHelpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{loginHelpModalText}</ModalContent>
    </Modal>
  );
};

export default view(PresortFinishedModal);

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
