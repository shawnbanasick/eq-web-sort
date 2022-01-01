import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const SubmitFailureModal = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const triggerModalOpen = useStore((state) => state.triggerTransmissionFailModal;
  const setTriggerTransmissionFailModal = useStore((state) => state.setTriggerTransmissionFailModal);

  const modalHead = ReactHtmlParser(
    decodeHTML(langObj.transferFailModalHeader)
  );
  const modalText = ReactHtmlParser(decodeHTML(langObj.transferFailModalText));

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerTransmissionFailModal(false);
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

export default view(SubmitFailureModal);

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
