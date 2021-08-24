import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";
import { view } from "@risingstack/react-easy-state";

const PromptUnload = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <React.Fragment>
      <Prompt
        when={false}
        message={() => "Are you sure you want to leave this page?"}
      />
    </React.Fragment>
  );
};

export default view(PromptUnload);
