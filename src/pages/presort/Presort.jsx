import React, { useState, useEffect } from "react";
import globalState from "../../globalState/globalState";
import setGlobalState from "../../globalState/setGlobalState";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export function PresortPage() {
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

  return (
    <div>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Simple centered modal</h2>
      </Modal>
      <h1>Presort Page!</h1>
    </div>
  );
}
