import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import getItemStyleImages from "./getItemStyleImages";
import getListStyle from "./getListStyle";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useStore from "../../globalState/useStore";

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
      columnColor,
      cardFontSize,
      greenCardColor,
      yellowCardColor,
      pinkCardColor,
      fontColor,
    } = this.props;

    // had to push column sort value to state because didn't want to edit dnd library result object
    // was't able to just pass it as a prop
    return (
      <ContainerDiv id="sortColumnsDiv">
        <Droppable
          id="ColDroppable"
          droppableId={columnId}
          direction="vertical"
        >
          {(provided, snapshot) => {
            if (snapshot.isDraggingOver) {
              useStore.setState({ draggingOverColumnId: columnId });
              useStore.setState({ currentSortValue: sortValue });
            }
            return (
              <div
                ref={provided.innerRef}
                style={getListStyle(
                  snapshot.isDraggingOver,
                  this.props,
                  forcedSorts,
                  columnWidth,
                  columnColor,
                  cardHeight
                )}
              >
                {columnStatementsArray.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      cardColor={item.cardColor}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ImageDiv
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyleImages(
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
                          {item.element}
                        </ImageDiv>
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

export default SortColumn;

/*
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
*/

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageDiv = styled.div`
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
  img {
    max-width: calc(100% - 10px);
    max-height: calc(100%; - 10px);
  }
`;
