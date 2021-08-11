import React from "react";
import setGlobalState from "../../globalState/setGlobalState";
import globalState from "../../globalState/globalState";
import { view } from "@risingstack/react-easy-state";

const PostsortPage = () => {
  setTimeout(function () {
    setGlobalState("currentPage", "postsort");
  }, 100);
  console.log(globalState);

  return (
    <div>
      <h1>PostSort Page!</h1>
    </div>
  );
};

export default view(PostsortPage);
