import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

const LandingModal = () => {
  const [open, setOpen] = useState(false);

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <Modal className="customModal" open={open} onClose={onCloseModal} center>
      <ModalHeader>Step 1 of 5</ModalHeader>
      <hr />
      <ModalContent>
        {ReactHtmlParser(window.languageXML.presortModalText)}
      </ModalContent>
    </Modal>
  );
};

export default view(LandingModal);

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
