import "./PostSort.css";
import React, { Component } from "react";
import LowCards from "./LowCards";
import LowCards2 from "./LowCards2";
import HighCards from "./HighCards";
import HighCards2 from "./HighCards2";
import NeutralCards from "./NeutralCards";
import state from "../state";
import calculateTimeOnPage from "../Utils/calculateTimeOnPage";
import styled from "styled-components";
// import displayDataObject from "../../Utils/displayDataObjectPostSort";

/* eslint react/prop-types: 0 */

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  paddingBottom: 25,
};

let startTime;

const handleClick = () => {
  state.setState({ displaySurvey: true, displayPostsort: false });
};

class PostSort extends Component {
  componentDidMount() {
    startTime = Date.now();
  }

  componentWillUnmount() {
    calculateTimeOnPage(startTime, "postSortPage", "PostSortPage");
  }

  render() {
    // pull data from localStorage
    const columnStatements = JSON.parse(
      localStorage.getItem("columnStatements")
    );
    // if (!columnStatements) {
    //   console.log("no local storage");
    //   columnStatements = store.getState().columnStatements;
    // }

    console.log(
      "TCL: PostSort -> render -> columnStatements",
      columnStatements
    );

    const {
      titleText,
      columnWidth,
      instructionsText,
      cardHeight,
      agreeObj,
      disagreeObj,
      neutralObj,
    } = this.props;

    console.log("TCL: PostSort -> render -> this.props", this.props);

    const highCards = columnStatements.vCols[agreeObj.columnDisplay];
    const highCards2 = columnStatements.vCols[agreeObj.columnDisplay2];
    const neutralCards = columnStatements.vCols[neutralObj.columnDisplay];
    const lowCards = columnStatements.vCols[disagreeObj.columnDisplay];
    const lowCards2 = columnStatements.vCols[disagreeObj.columnDisplay2];

    return (
      <>
        <div className="titleDiv">
          <h1>{titleText}</h1>
          <h3>{instructionsText}</h3>
          <button
            className="postSortButton"
            type="button"
            onClick={handleClick}
          >
            Next
          </button>
        </div>
          <div style={styles}>
            <HighCards
              agreeObj={agreeObj}
              height={cardHeight}
              width={columnWidth}
              highCards={highCards}
              columnDisplay={agreeObj.columnDisplay}
              columnStatements={columnStatements}
            />

            {agreeObj.displaySecondColumn && (
              <HighCards2
                agreeObj={agreeObj}
                height={cardHeight}
                width={columnWidth}
                highCards2={highCards2}
                columnDisplay={agreeObj.columnDisplay2}
                columnStatements={columnStatements}
              />
            )}

            {neutralObj.displayNeutralObjects && (
              <NeutralCards
                neutralObj={neutralObj}
                height={cardHeight}
                width={columnWidth}
                columnDisplay={neutralObj.columnDisplay}
                neutralCards={neutralCards}
                columnStatements={columnStatements}
              />
            )}

            {disagreeObj.displaySecondColumn && (
              <LowCards2
                disagreeObj={disagreeObj}
                height={cardHeight}
                width={columnWidth}
                lowCards2={lowCards2}
                columnStatements={columnStatements}
                columnDisplay={disagreeObj.columnDisplay2}
              />
            )}

            <LowCards
              disagreeObj={disagreeObj}
              height={cardHeight}
              width={columnWidth}
              lowCards={lowCards}
              columnStatements={columnStatements}
              columnDisplay={disagreeObj.columnDisplay}
            />
          </div>
        
        
      </div>
    );
  }
}

export default PostSort;
