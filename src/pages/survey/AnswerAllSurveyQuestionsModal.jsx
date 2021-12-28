import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";

const AnswerAllSurveyQeustionsModal = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);

  const triggerModalOpen = getGlobalState("triggerSurveyPreventNavModal");

  const modalHead = ReactHtmlParser(
    decodeHTML(langObj.surveyPreventNavModalHead)
  );
  const modalText = ReactHtmlParser(
    decodeHTML(langObj.surveyPreventNavModalText)
  );

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setGlobalState("triggerSurveyPreventNavModal", false);
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

export default view(AnswerAllSurveyQeustionsModal);

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
