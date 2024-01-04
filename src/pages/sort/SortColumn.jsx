import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import getItemStyle from "./getItemStyle";
import getListStyle from "./getListStyle";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";

/* eslint react/prop-types: 0 */

const SortColumn = (props) => {
  const {
    forcedSorts,
    columnWidth,
    cardHeight,
    columnId,
    sortValue,
    columnStatementsArray,
    columnColor,
    cardFontSize,
    greenCardColor,
    yellowCardColor,
    pinkCardColor,
    fontColor,
  } = props;

  // had to push column sort value to state because didn't want to edit dnd library result object
  // was't able to just pass it as a prop
  return (
    <SortColumnsDiv id="sortColumnsDiv">
      <Droppable id="ColDroppable" droppableId={columnId} direction="vertical">
        {(provided, snapshot) => {
          if (snapshot.isDraggingOver) {
            useStore.setState({ draggingOverColumnId: columnId });
            useStore.setState({ currentSortValue: sortValue });
          }
          return (
            <DroppableColDiv
              id="DroppableColDiv"
              ref={provided.innerRef}
              style={getListStyle(
                snapshot.isDraggingOver,
                props,
                forcedSorts,
                columnWidth,
                columnColor,
                cardHeight
              )}
            >
              {columnStatementsArray.map((item, index) => {
                const statementHtml = ReactHtmlParser(
                  `<div>${decodeHTML(item.statement)}</div>`
                );
                return (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    cardColor={item.cardColor}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <StatementDiv
                        id="StatementDiv"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                          columnWidth,
                          cardHeight,
                          cardFontSize,
                          `${item.cardColor}`,
                          greenCardColor,
                          yellowCardColor,
                          pinkCardColor,
                          fontColor
                        )}
                      >
                        {statementHtml}
                      </StatementDiv>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </DroppableColDiv>
          );
        }}
      </Droppable>
    </SortColumnsDiv>
  );
};

export default React.memo(SortColumn);

const SortColumnsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const DroppableColDiv = styled.div`
  justify-items: center;
`;

const StatementDiv = styled.div`
  display: flex;
  width: 96%;
  margin-left: 2%;
  margin-bottom: 5px !important;
  height: ${(props) => `${props.cardHeight}px`};
  justify-content: center;
`;
