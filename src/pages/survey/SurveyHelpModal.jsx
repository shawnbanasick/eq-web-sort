import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import decodeHTML from "../../utilities/decodeHTML";

const SurveyHelpModal = () => {
  const triggerPostsortModal = getGlobalState("triggerSurveyModal");
  const langObj = getGlobalState("langObj");

  const postsortHelpModalHead = ReactHtmlParser(
    decodeHTML(langObj.surveyModalHead)
  );
  const postsortHelpModalText = ReactHtmlParser(
    decodeHTML(langObj.surveyModalText)
  );

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setGlobalState("triggerSurveyModal", false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerPostsortModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{postsortHelpModalHead}</ModalHeader>
      <hr />
      <ModalContent>{postsortHelpModalText}</ModalContent>
    </Modal>
  );
};

export default view(SurveyHelpModal);

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
