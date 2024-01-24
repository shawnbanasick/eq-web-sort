import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import getItemStyleImages from "./getItemStyleImages";
import getListStyleImages from "./getListStyleImages";
import useStore from "../../globalState/useStore";

/* eslint react/prop-types: 0 */

const SortColumnImages = (props) => {
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
    handleOpenImageModal,
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
              style={getListStyleImages(
                snapshot.isDraggingOver,
                props,
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
                        id="imageDiv"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={(e) =>
                          handleOpenImageModal(e, item.element.props.src)
                        }
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
                        <img
                          src={item.element.props.src}
                          alt={item.element.props.alt}
                          style={{ border: "1px solid black" }}
                        />
                      </ImageDiv>
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

export default React.memo(SortColumnImages);

const SortColumnsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const DroppableColDiv = styled.div`
  justify-items: center;
`;

const ImageDiv = styled.div`
  display: flex;
  width: 96%;
  margin-left: 2%;
  margin-bottom: 5px !important;
  height: ${(props) => `${props.cardHeight}px`};
  justify-content: center;

  img {
    max-width: 96%;
    max-height: 96%;
    object-fit: contain;
  }
`;
