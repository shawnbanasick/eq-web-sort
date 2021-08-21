import React, { Component } from "react";
import styled from "styled-components";
import { view } from "@risingstack/react-easy-state";
// import getPostSortCardStyleHigh from "./getPostSortCardStyleHigh";

/* eslint react/prop-types: 0 */

// format example ===> {high: ["column4"], middle: ["column0"], low: ["columnN4"]}

class HighCards2 extends Component {
  // on leaving card comment section,
  onBlur = (event, columnStatements, columnDisplay, itemId) => {
    const cards = columnStatements.vCols[columnDisplay];
    const targetCard = event.target.id;
    const userEnteredText = event.target.value;

    const identifier = `${columnDisplay}_Card${itemId + 1}`;

    // pull in state object for comments
    const statementCommentsObj =
      JSON.parse(localStorage.getItem("statementCommentsObj")) || {};

    // to update just the card that changed
    cards.map((el) => {
      if (el.id === targetCard) {
        const comment3 = userEnteredText;
        // remove new line and commas to make csv export easier
        const comment2 = comment3.replace(/\n/g, " ");
        const comment = comment2.replace(/,/g, " ");
        // assign to main data object for confirmation / debugging
        el.comment = comment;

        // assign to comments object
        statementCommentsObj[identifier] = `${el.id}>>>${comment}`;
      }
      return el;
    });

    localStorage.setItem(
      "statementCommentsObj",
      JSON.stringify(statementCommentsObj)
    );

    localStorage.setItem("columnStatements", JSON.stringify(columnStatements));
  }; // end onBlur

  render() {
    const {
      height,
      width,
      columnDisplay,
      agreeObj,
      highCards2,
      columnStatements,
      cardFontSize,
    } = this.props;
    const { agreeText, placeholder } = agreeObj;

    return highCards2.map((item, index) => (
      <Container key={item.statement}>
        <CardTag>{agreeText}</CardTag>
        <CardAndTextHolder>
          <Card cardFontSize={cardFontSize} width={width} height={height}>
            {item.statement}
          </Card>
          <TagContainerDiv>
            <CommentArea
              data-gramm_editor="false"
              height={height}
              id={item.id}
              placeholder={placeholder}
              defaultValue={item.comment}
              onBlur={(e) => {
                this.onBlur(e, columnStatements, columnDisplay, index);
              }}
            />
          </TagContainerDiv>
        </CardAndTextHolder>
      </Container>
    ));
  }
}

export default view(HighCards2);

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
  margin-top: 50px;
  border-radius: 3px;
`;

const CardTag = styled.div`
  width: 100%;
  background: #c7f6c7;
  color: black;
  text-align: center;
`;

const CardAndTextHolder = styled.div`
  display: flex;
  align-content: center;
  background: #7e7e7e;
  width: 90vw;
  max-width: 900px;
`;

const CommentArea = styled.textarea`
  padding: 10px;
  margin-top: 2px;
  background-color: whitesmoke;
  height: ${(props) => `${props.height}px;`};
  width: calc(100% - 6px);
`;

const TagContainerDiv = styled.div`
  padding-top: 3px;
  width: 100%;
`;

const Card = styled.div`
  user-select: "none";
  padding: 0 2px 0 2px;
  margin: 5px 5px 5px 5px;
  line-height: 1em;
  height: ${(props) => `${props.height}px;`};
  max-width: ${(props) => `${props.width}px;`};
  border-radius: 5px;
  font-size: ${(props) => `${props.cardFontSize}px`};
  display: flex;
  align-items: center;
  border: 2px solid black;
  background-color: #f6f6f6;
  text-align: center;
`;
