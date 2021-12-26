import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import LocalConfirmDeleteButton from "./LocalConfirmDeleteButton";

const LocalDeleteModal = () => {
  const triggerLocalDeleteModal = getGlobalState("triggerLocalDeleteModal");
  const langObj = getGlobalState("langObj");

  const localDeleteModalHead = ReactHtmlParser(
    decodeHTML(langObj.localDeleteModalHead)
  );
  const localDeleteModalText = ReactHtmlParser(
    decodeHTML(langObj.localDeleteModalText)
  );

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setGlobalState("triggerLocalDeleteModal", false);
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
