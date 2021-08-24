import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import getGlobalState from "../../globalState/getGlobalState";
import decodeHTML from "../../utilities/decodeHTML";

const PresortModal = () => {
  const [open, setOpen] = useState(false);

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const langObj = getGlobalState("langObj");

  const header = ReactHtmlParser(decodeHTML(langObj.presortModalHead));
  const modalText = ReactHtmlParser(decodeHTML(langObj.presortModalText));

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Modal className="customModal" open={open} onClose={onCloseModal} center>
      <ModalHeader>{header}</ModalHeader>
      <hr />
      <ModalContent>{modalText}</ModalContent>
    </Modal>
  );
};

export default view(PresortModal);

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
