import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerModalOpen = (state) => state.triggerSurveyPreventNavModal;
const getSetTrigSurvPrevNavModal = (state) =>
  state.setTriggerSurveyPreventNavModal;

const AnswerAllSurveyQuestionsModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerModalOpen = useStore(getTriggerModalOpen);
  const setTriggerSurveyPreventNavModal = useStore(getSetTrigSurvPrevNavModal);

  const modalHead =
    ReactHtmlParser(decodeHTML(langObj.surveyPreventNavModalHead)) || "";
  const modalText =
    ReactHtmlParser(decodeHTML(langObj.surveyPreventNavModalText)) || "";

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerSurveyPreventNavModal(false);
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

export default AnswerAllSurveyQuestionsModal;

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
