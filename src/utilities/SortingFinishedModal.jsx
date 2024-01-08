import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "./decodeHTML";
import useSettingsStore from "../globalState/useSettingsStore";
import useStore from "../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerSortFinishedMod = (state) => state.triggerSortingFinishedModal;
const getSetTrigSortFinishMod = (state) => state.setTriggerSortingFinishedModal;

const SortingFinishedModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerSortingFinishedModal = useStore(getTriggerSortFinishedMod);
  const setTriggerSortingFinishedModal = useStore(getSetTrigSortFinishMod);

  const helpModalHead =
    ReactHtmlParser(decodeHTML(langObj.sortingCompleteModalHead)) || "";
  const helpModalText =
    ReactHtmlParser(decodeHTML(langObj.sortingCompleteModalText)) || "";

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerSortingFinishedModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerSortingFinishedModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{helpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{helpModalText}</ModalContent>
    </Modal>
  );
};

export default SortingFinishedModal;

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
