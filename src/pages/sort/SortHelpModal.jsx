import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const SortHelpModal = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);
  const triggerSortModal = useStore((state) => state.triggerSortModal);
  const setTriggerSortModal = useStore((state) => state.setTriggerSortModal);

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

export default view(SortHelpModal);

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
