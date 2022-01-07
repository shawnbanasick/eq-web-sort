import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getTriggerPostsortModal = (state) => state.triggerPostsortModal;
const getSetTriggerPostsortModal = (state) => state.setTriggerPostsortModal;

const PostsortHelpModal = () => {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const triggerPostsortModal = useStore(getTriggerPostsortModal);
  const setTriggerPostsortModal = useStore(getSetTriggerPostsortModal);

  const postsortHelpModalHead = ReactHtmlParser(
    decodeHTML(langObj.postsortModalHead)
  );
  const postsortHelpModalText = ReactHtmlParser(
    decodeHTML(langObj.postsortModalText)
  );

  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setTriggerPostsortModal(false);
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

export default PostsortHelpModal;

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
