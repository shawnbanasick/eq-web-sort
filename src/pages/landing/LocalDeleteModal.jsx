import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import LocalConfirmDeleteButton from "./LocalConfirmDeleteButton";
import useStore from "../../globalState/useStore";
import useSettingsStore from "../../globalState/useSettingsStore";

const LocalDeleteModal = () => {
  // STATE
  const langObj = useSettingsStore((state) => state.langObj);

  const localDeleteModalHead = ReactHtmlParser(
    decodeHTML(langObj.localDeleteModalHead)
  );
  const localDeleteModalText = ReactHtmlParser(
    decodeHTML(langObj.localDeleteModalText)
  );

  // STATE
  const triggerLocalDeleteModal = useStore(
    (state) => state.triggerLocalDeleteModal
  );
  const setLocalDeleteModal = useStore((state) => state.setLocalDeleteModal);

  const onCloseModal = () => {
    setLocalDeleteModal(false);
  };

  return (
    <Modal
      className="customModal"
      open={triggerLocalDeleteModal}
      onClose={onCloseModal}
      center
    >
      <ModalHeader>{localDeleteModalHead}</ModalHeader>
      <hr />
      <ModalContent>{localDeleteModalText}</ModalContent>
      <ButtonContainer>
        <LocalConfirmDeleteButton />
      </ButtonContainer>
    </Modal>
  );
};

export default view(LocalDeleteModal);

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
`;

// react-responsive-modal-overlay
