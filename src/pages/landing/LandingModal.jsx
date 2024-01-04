import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerLandingModal = (state) => state.triggerLandingModal;
const getSetTriggerLandingModal = (state) => state.setTriggerLandingModal;

const LandingModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerLandingModal = useStore(getTriggerLandingModal);
  const setTriggerLandingModal = useStore(getSetTriggerLandingModal);

  const loginHelpModalHead =
    ReactHtmlParser(decodeHTML(langObj.landingHelpModalHead)) || "";
  const loginHelpModalText =
    ReactHtmlParser(decodeHTML(langObj.landingHelpModalText)) || "";

  const onCloseModal = () => {
    setTriggerLandingModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerLandingModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{loginHelpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{loginHelpModalText}</ModalContent>
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
