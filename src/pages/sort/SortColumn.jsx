import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import getItemStyle from "./getItemStyle";
import setGlobalState from "../../globalState/setGlobalState";
import getListStyle from "./getListStyle";

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

    console.log(columnHeadersColor);

    // had to push column sort value to state because didn't want to edit dnd library result object
    // was't able to just pass it as a prop
    return (
      <Droppable droppableId={columnId}>
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
              <HeaderDiv
                color={columnHeadersColor}
                data-react-beautiful-dnd-drag-handle="0"
              >
                {qSortHeaderNumber}
              </HeaderDiv>
              {columnStatementsArray.map((item, index) => (
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
                      {item.statement}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    );
  }
}

export default view(SortColumn);

const HeaderDiv = styled.div`
  background: ${(props) => props.color};
  text-align: center;
  border-bottom: 2px solid black;
  margin-bottom: 7px;
  font-weight: bold;
  font-size: 25px;
`;
