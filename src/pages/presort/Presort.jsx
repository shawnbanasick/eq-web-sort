import React, { useState, useEffect } from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import getGlobalState from "../../globalState/getGlobalState";
// import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

const PresortPage = () => {
  setTimeout(function () {
    setGlobalState("currentPage", "presort");
  }, 100);
  console.log(globalState);

  const [open, setOpen] = useState(false);

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const presortCards = getGlobalState("presortCards");
  // console.log(JSON.stringify(presortCards));

  return (
    <div>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Modal className="customModal" open={open} onClose={onCloseModal} center>
        <ModalHeader>Step 1 of 5</ModalHeader>
        <hr />
        <ModalContent>
          {ReactHtmlParser(window.languageXML.presortModalText)}
        </ModalContent>
      </Modal>
      <h1>Presort Page!</h1>
    </div>
  );
};

export default view(PresortPage);

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
