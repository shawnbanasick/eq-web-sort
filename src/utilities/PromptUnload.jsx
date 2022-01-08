import React, { useEffect } from "react";
import { Prompt } from "react-router-dom";

const PromptUnload = () => {
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    // e.preventDefault();
    // e.returnValue = "";
    var message = "o/";

    (e || window.event).returnValue = message; //Gecko + IE
    return message;
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

export default PromptUnload;
