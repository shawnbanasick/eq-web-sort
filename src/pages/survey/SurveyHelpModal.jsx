import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerSurveyModal = (state) => state.triggerSurveyModal;
const getSetTriggerSurveyModal = (state) => state.setTriggerSurveyModal;

const SurveyHelpModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerSurveyModal = useStore(getTriggerSurveyModal);
  const setTriggerSurveyModal = useStore(getSetTriggerSurveyModal);

  const helpModalHead =
    ReactHtmlParser(decodeHTML(langObj.surveyModalHead)) || "";
  const helpModalText =
    ReactHtmlParser(decodeHTML(langObj.surveyModalText)) || "";

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerSurveyModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerSurveyModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{helpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{helpModalText}</ModalContent>
    </Modal>
  );
};

export default SurveyHelpModal;

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
  font-weight: normal;
`;

// react-responsive-modal-overlay
