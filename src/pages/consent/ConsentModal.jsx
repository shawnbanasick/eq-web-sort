import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerConsentModal = (state) => state.triggerConsentModal;
const getSetTriggerConsentModal = (state) => state.setTriggerConsentModal;

const LandingModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerConsentModal = useStore(getTriggerConsentModal);
  const setTriggerConsentModal = useStore(getSetTriggerConsentModal);

  const consentHelpModalHead =
    ReactHtmlParser(decodeHTML(langObj.consentHelpModalHead)) || "";
  const consentHelpModalText =
    ReactHtmlParser(decodeHTML(langObj.consentHelpModalText)) || "";

  const onCloseModal = () => {
    setTriggerConsentModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerConsentModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{consentHelpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{consentHelpModalText}</ModalContent>
    </Modal>
  );
};

export default LandingModal;

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
