import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import getItemStyle from "./getItemStyle";
import setGlobalState from "../../globalState/setGlobalState";
import getListStyle from "./getListStyle";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

/* eslint react/prop-types: 0 */

class SortColumn extends React.Component {
  render() {
    const {
      forcedSorts,
      columnWidth,
      cardHeight,
      columnId,
      sortValue,
      columnStatementsArray,
      qSortHeaderNumber,
      columnColor,
      cardFontSize,
      columnHeadersColor,
    } = this.props;

    // had to push column sort value to state because didn't want to edit dnd library result object
    // was't able to just pass it as a prop
    return (
      <ContainerDiv>
        <HeaderDiv
          color={columnHeadersColor}
          data-react-beautiful-dnd-drag-handle="0"
        >
          {qSortHeaderNumber}
        </HeaderDiv>
        <Droppable droppableId={columnId} direction="vertical">
          {(provided, snapshot) => {
            if (snapshot.isDraggingOver) {
              setGlobalState("draggingOverColumnId", columnId);
              setGlobalState("currentSortValue", sortValue);
            }
            return (
              <div
                ref={provided.innerRef}
                style={getListStyle(
                  snapshot.isDraggingOver,
                  this.props,
                  forcedSorts,
                  columnWidth,
                  columnColor
                )}
              >
                {columnStatementsArray.map((item, index) => {
                  const statementHtml = ReactHtmlParser(
                    decodeHTML(item.statement)
                  );
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      cardColor={item.cardColor}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            columnWidth,
                            cardHeight,
                            cardFontSize,
                            `${item.cardColor}`
                          )}
                        >
                          {statementHtml}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </ContainerDiv>
    );
  }
}

export default view(SortColumn);

const HeaderDiv = styled.div`
  background: ${(props) => props.color};
  text-align: center;
  border-bottom: 2px solid black;
  min-width: 50px;
  border-radius: 2px;
  margin-bottom: 1px;
  font-weight: bold;
  font-size: 25px;
  border-right: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
